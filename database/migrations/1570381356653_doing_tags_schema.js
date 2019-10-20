'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoingTagsSchema extends Schema {
  up () {
    this.create('doing_tags', (table) => {
      table.increments()
      table.string('tag',25)
      table.timestamps()
    })
  }

  down () {
    this.drop('doing_tags')
  }
}

module.exports = DoingTagsSchema
