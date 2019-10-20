'use strict'
const Database = use('Database')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with peopletags
 */
class PeopleTagController {

  async searchTags({
    params,
    response,
    auth
  }) {
    var search = decodeURIComponent(params.search)
    var tags = await Database
      .raw(`
    select pt.tag
    from people_tags pt
    join diary_people_tag ptd on ptd.people_tag_id = pt.id and ptd.user_id = ${auth.user.id}
    where pt.tag like '%${search}%'
    group by pt.tag
    limit 5
    `)
    return response.json(tags[0])
  }

  /**
   * Show a list of all peopletags.
   * GET peopletags
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new peopletag.
   * GET peopletags/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new peopletag.
   * POST peopletags
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single peopletag.
   * GET peopletags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing peopletag.
   * GET peopletags/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update peopletag details.
   * PUT or PATCH peopletags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a peopletag with id.
   * DELETE peopletags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PeopleTagController
