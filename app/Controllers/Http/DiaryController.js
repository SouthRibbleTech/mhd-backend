'use strict'
const Diary = use('App/Models/Diary')
const DoingTags = use('App/Models/DoingTag')
const PeopleTags = use('App/Models/PeopleTag')
const Promise = require('bluebird')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with diaries
 */
class DiaryController {
  /**
   * Show a list of all diaries.
   * GET diaries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, params, auth }) {
    var user = await auth.current.user
    var diary = await user
    .diaryEnteries()
    .orderBy('created_at', 'desc')
    .with('doingTags')
    .with('peopleTags')
    .paginate(params.page, params.perPage)
    return response.json(diary)
  }

  /**
   * Render a form to be used for creating a new diary.
   * GET diaries/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, auth }) {
    var user = auth.user
    var diary  = new Diary()
    
    diary.diary_date = request.body.diaryDate
    diary.feeling = request.body.feelingsLevel
    diary.diary_entry = request.body.diaryEntry
    diary.private = request.body.private
  
    await user.diaryEnteries().save(diary)

    //Save tags
    
    await Promise.map(request.body.doingTags, async (tag)=>{
      var doingTag = await DoingTags.query().where('tag', tag).first()
      if(!doingTag) {
        var doingTag = new DoingTags()
        doingTag.tag = tag
        await doingTag.save()
      }
      await diary.doingTags().attach([doingTag.id], (row)=>{
        row.user_id = user.id
      })
      return
    })

    await Promise.map(request.body.peopleTags, async (tag) => {
      var peopleTag = await PeopleTags.query().where('tag', tag).first()
      if(!peopleTag) {
        var peopleTag = new PeopleTags()
        peopleTag.tag = tag
        await peopleTag.save()
      }
      await diary.peopleTags().attach([peopleTag.id], (row) => {
        row.user_id = user.id
      })
      return
    })

    return response.status(200).send(diary.id)
  }

  /**
   * Create/save a new diary.
   * POST diaries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single diary.
   * GET diaries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing diary.
   * GET diaries/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update diary details.
   * PUT or PATCH diaries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a diary with id.
   * DELETE diaries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = DiaryController
