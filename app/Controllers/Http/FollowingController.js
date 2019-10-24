'use strict'
const User = use('App/Models/User')
const Following = use('App/Models/Following')
const Invite = use('App/Models/Invite')
const db = use('Database')
const uuid = require('uuid/v4')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with followings
 */
class FollowingController {
  /**
   * Show a list of all followings.
   * GET followings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
    var user = await auth.current.user
    // var following = await user.following().with('followingUser', (builder)=>{
    //   builder.select('id', 'username')
    // }).fetch()

    var following = await db.raw(`
      select 
      u.id, 
      u.username, 
      f.block as blocked,
      if(i.invited_user IS NOT NULL, 1, 0) as invite_sent,
      if(f.other_user_id IS NOT NULL, 1, 0) as following,
      if(fb.other_user_id IS NOT NULL, 1, 0) as follow_back
      from users u
      join settings s on s.user_id = u.id
      left join followings f on f.user_id = ${user.id} and f.other_user_id = u.id
      left join followings fb on fb.other_user_id = ${user.id} and fb.user_id = u.id
      left join invites i on i.invited_by = ${user.id} and i.invited_user = u.id
      where f.user_id = ${user.id}
      order by u.username
    `)
    console.log(following[0])
    return response.json(following[0])
  }

  /**
   * Render a form to be used for creating a new following.
   * GET followings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new following.
   * POST followings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    var user = await auth.current.user
    var otherUserID = request.body.other_user_id
    var otherUser = await User.find(otherUserID)
    if(!otherUser){
      return response.status(400).send("user to follow not found")
    }
    //Create a new invite
    var invite = new Invite()
    invite.invited_by = user.id
    invite.invited_user = otherUserID
    invite.uuid = uuid()
    await invite.save()
    return response.status(200).send("OK")
    // var following = new Following()
    // following.other_user_id = otherUserID,
    // following.block = 1
    // await user.followers().save(following)
    // return response.status(200).send("OK")
  }

  async acceptRequest({ params, response, auth }) {
    var user = await auth.current.user
    var invite = await Invite.find(params.id)
    var following = new Following()
    following.user_id = invite.invited_by
    following.other_user_id = user.id
    following.block = 0
    await following.save()
    await invite.delete()
    return response.status(200).send('OK')
  }

  async rejectRequest({ params, response }) {
    var invite = await Invite.find(params.id)
    await invite.delete()
    return response.status(200).send('OK')
  }

  async search({ params, response, auth }) {
    var user = await auth.current.user
    var searchResult = await db.raw(`
      select 
      u.id, 
      u.username, 
      if (i.invited_user IS NOT NULL, 1, 0) as invite_sent,
      if (ir.invited_user IS NOT NULL, 1, 0) as invite_recieved,
      if(f.other_user_id IS NOT NULL, 1, 0) as following,
      if(fb.other_user_id IS NOT NULL, 1, 0) as follow_back
      from users u
      join settings s on s.user_id = u.id
      left join followings f on f.user_id = ${user.id} and f.other_user_id = u.id
      left join followings fb on fb.user_id = ${user.id} and fb.other_user_id = u.id
      left join invites ir on ir.invited_by = u.id and ir.invited_user = ${user.id}
      left join invites i on i.invited_by = ${user.id} and i.invited_user = u.id
      where s.findable = 1
      and u.username like '%${params.searchTerm}%'
      and u.id != ${user.id}
      order by u.username
    `)
    console.log(JSON.stringify(searchResult[0],null,2))
    return response.json(searchResult[0])
  }

  /**
   * Display a single following.
   * GET followings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing following.
   * GET followings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update following details.
   * PUT or PATCH followings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a following with id.
   * DELETE followings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    var user = await auth.current.user
    var otherUser = params.id
    await db.raw(`
      delete from followings
      where user_id = ${user.id}
      and other_user_id = ${otherUser}
    `)
    await db.raw(`
      delete from invites
      where invited_by = ${user.id}
      and invited_user = ${otherUser}
    `)
    return response.status(200).send("OK")
  }

  async block({ params, response, auth }){
    var user = await auth.current.user
    var other_user_id = params.id
    var following = await Following.query().where('user_id', user.id).where('other_user_id', other_user_id).first()
    following.block = 1
    await following.save()
    console.log(following)
    return response.status(200).send("OK")
  }
  
  async unblock({ params, response, auth }){
    var user = await auth.current.user
    var other_user_id = params.id
    var following = await Following.query().where('user_id', user.id).where('other_user_id', other_user_id).first()
    following.block = 0
    await following.save()
    console.log(following)
    return response.status(200).send("OK")
  }

  async counts({ response, auth }) {
    var user = await auth.current.user
    var countsResult = await db.raw(`
      select 
      (select count(i.id) from invites i where i.invited_user = ${user.id}) as requests,
      (select count(f.id) from followers f where f.user_id = ${user.id}) as followers,
      (select count(f1.id) from followings f1 where f1.user_id = ${user.id}) as following
    `)
    return response.json(countsResult[0][0])
  }

  async requests({ response, auth }) {
    var user = await auth.current.user
    var invites = await user.invitesReceived().with('invitedByUser').fetch()
    response.json(invites)
  }
}

module.exports = FollowingController
