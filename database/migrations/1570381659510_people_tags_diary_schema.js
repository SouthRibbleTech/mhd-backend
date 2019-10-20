'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PeopleTagsDiarySchema extends Schema {
  up () {
    this.create('diary_tags_people', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('diary_id').unsigned().references('id').inTable('diaries')
      table.integer('people_tag_id')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('people_tags_diaries')
  }
}

module.exports = PeopleTagsDiarySchema
