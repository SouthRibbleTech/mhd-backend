'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DiaryTagsDoing extends Model {
    static get table () {
        return "diary_tags_doing"
    }
}

module.exports = DiaryTagsDoing
