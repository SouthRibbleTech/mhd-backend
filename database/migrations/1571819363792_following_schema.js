'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowingSchema extends Schema {
  up () {
    this.create('followings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('other_user_id').unsigned().notNullable().references('id').inTable('users')
      table.boolean('block').defaultsTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('followings')
  }
}

module.exports = FollowingSchema
