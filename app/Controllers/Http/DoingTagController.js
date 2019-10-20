'use strict'
const DoingTag = use('App/Models/DoingTag')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with doingtags
 */
class DoingTagController {

  async searchTags({ params, response, auth }) {
    var search = decodeURIComponent(params.search)
    var tags = await Database
    .raw(`
    select dt.tag
    from doing_tags dt
    join diary_doing_tag dtd on dtd.doing_tag_id = dt.id and dtd.user_id = ${auth.user.id}
    where dt.tag like '%${search}%'
    group by dt.tag
    limit 5
    `)
    return response.json(tags[0])
  }

  /**
   * Show a list of all doingtags.
   * GET doingtags
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new doingtag.
   * GET doingtags/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new doingtag.
   * POST doingtags
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single doingtag.
   * GET doingtags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing doingtag.
   * GET doingtags/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update doingtag details.
   * PUT or PATCH doingtags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a doingtag with id.
   * DELETE doingtags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = DoingTagController
