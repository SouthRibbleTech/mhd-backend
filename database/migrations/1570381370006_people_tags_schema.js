'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PeopleTagsSchema extends Schema {
  up () {
    this.create('people_tags', (table) => {
      table.increments()
      table.string('tag',25)
      table.timestamps()
    })
  }

  down () {
    this.drop('people_tags')
  }
}

module.exports = PeopleTagsSchema
