'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InviteSchema extends Schema {
  up () {
    this.create('invites', (table) => {
      table.increments()
      table.integer('invited_by').unsigned().notNullable().references('id').inTable('users')
      table.string('email')
      table.datetime('accepted_at')
      table.integer('invited_user').unsigned()
      table.text('uuid').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('invites')
  }
}

module.exports = InviteSchema
