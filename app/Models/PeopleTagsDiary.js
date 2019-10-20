'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DiaryTagsPeople extends Model {
    static get table () {
        return "diary_tags_people"
    }
    diaryEnteries() {
        return this.belongsToMany('App/Models/Diary').pivotTable('diary_tags_people')
    }
}

module.exports = DiaryTagsPeople
