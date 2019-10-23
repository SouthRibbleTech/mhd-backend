'use strict'
const Invite = use('App/Models/Invite')
const User = use('App/Models/User')
const Mail = use('Mail')
const uuidv4 = require('uuid/v4')
const Env = use('Env')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with invites
 */
class InviteController {
  /**
   * Show a list of all invites.
   * GET invites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
    var user = await auth.current.user
    var invitesSent = await user.invitesSent().fetch()
    return response.json(invitesSent)
  }

  /**
   * Render a form to be used for creating a new invite.
   * GET invites/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new invite.
   * POST invites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    var user = await auth.current.user
    
    if(!request.body.email && !request.body.invited_user_id) {
      //No email or user id was provided. Return an error
      return response.status(400).send("no email or user sent")
    }
    if (request.body.invited_user_id > 0) {
      //Check that userid exists
      var invited_user = await User.find(request.body.invited_user_id)
      if (!invited_user) {
        //if not return an error
        return response.status(400).send("Invited user not found")
      }
    }


    //Save the invite
    //Craete a unique ID for this invite
    var inviteID = uuidv4()
    var invite = new Invite()
    invite.invited_by = user.id
    invite.email = request.body.email
    invite.invite_user = request.body.invited_user_id
    invite.uuid = inviteID
    await invite.save()

    if(request.body.email){
      //Send email to invited user
      await Mail.send('emails.invite', {user: user.toJSON(), inviteID}, (message)=>{
        message
        .to(request.body.email)
        .from(Env.get('SUPPORT_EMAIL'))
        .subject('You have been invited to follow ' + user.username)
      })
    }

    return response.status(200)
  }

  /**
   * Display a single invite.
   * GET invites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing invite.
   * GET invites/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update invite details.
   * PUT or PATCH invites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a invite with id.
   * DELETE invites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = InviteController
