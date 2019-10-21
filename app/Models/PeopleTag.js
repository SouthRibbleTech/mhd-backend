'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PeopleTag extends Model {
  diaryEntries() {
    return this.belongsToMany('App/Models/Diary').pivotTable('diary_people_tag')
  }
}

module.exports = PeopleTag
