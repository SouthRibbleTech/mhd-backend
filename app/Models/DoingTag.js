'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DoingTag extends Model {
    diaryEntries() {
        return this.belongsToMany('App/Models/Diary').pivotTable('diary_tags_doing')
    }
}

module.exports = DoingTag
