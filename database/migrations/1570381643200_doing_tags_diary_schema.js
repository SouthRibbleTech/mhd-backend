'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoingTagsDiarySchema extends Schema {
  up () {
    this.create('diary_doing_tag', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('diary_id').unsigned().references('id').inTable('diaries')
      table.integer('doing_tag_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('diary_tags_doing')
  }
}

module.exports = DoingTagsDiarySchema
