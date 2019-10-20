'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiarySchema extends Schema {
  up () {
    this.create('diaries', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.datetime('diary_date')
      table.integer('feeling')
      table.text('diary_entry')
      table.timestamps()
    })
  }

  down () {
    this.drop('diaries')
  }
}

module.exports = DiarySchema
