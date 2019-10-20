'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiarySchema extends Schema {
  up () {
    this.table('diaries', (table) => {
      // alter table
      table.boolean('private').defaultsTo(false)
    })
  }

  down () {
    this.table('diaries', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DiarySchema
