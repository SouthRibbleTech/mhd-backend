'use strict'
const User = use('App/Models/User')
const Following = use('App/Models/Following')
const db = use('Database')
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
      if(f.other_user_id IS NOT NULL, 1, 0) as following,
      if(fb.other_user_id IS NOT NULL, 1, 0) as follow_back
      from users u
      join settings s on s.user_id = u.id
      left join followings f on f.user_id = ${user.id} and f.other_user_id = u.id
      left join followings fb on fb.other_user_id = ${user.id} and fb.user_id = u.id
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
    var following = new Following()
    following.other_user_id = otherUserID,
    following.block = 0
    await user.followers().save(following)
    return response.status(200).send("OK")
  }

  async search({ params, response, auth }) {
    var user = await auth.current.user
    var searchResult = await db.raw(`
      select 
      u.id, 
      u.username, 
      if(f.other_user_id IS NOT NULL, 1, 0) as following,
      if(fb.other_user_id IS NOT NULL, 1, 0) as follow_back
      from users u
      join settings s on s.user_id = u.id
      left join followings f on f.user_id = ${user.id} and f.other_user_id = u.id
      left join followings fb on fb.other_user_id = ${user.id} and fb.user_id = u.id
      where s.findable = 1
      and u.username like '%${params.searchTerm}%'
      and u.id != ${user.id}
      order by u.username
    `)
    
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
}

module.exports = FollowingController
