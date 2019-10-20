'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Diary extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    doingTags () {
        return this.belongsToMany('App/Models/DoingTag')
    }

    peopleTags() {
        return this.belongsToMany('App/Models/PeopleTag')
    }

    static get dates () {
        return super.dates.concat(['diary_date'])
    }

    static castDates(field, value) {
      if (field === 'diary_date') {
        return value.format("YYYY-MM-DD H:m")
      }
      return super.formatDates(field, value)
    }
}

module.exports = Diary
