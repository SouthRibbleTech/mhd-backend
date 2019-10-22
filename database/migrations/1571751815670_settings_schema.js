'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SettingsSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.boolean('accept_invites').defaultsTo(true)
      table.boolean('findable').defaultsTo(false)
      table.boolean('notify_followers').defaultsTo(false)
      table.boolean('diary_text_private').defaultsTo(false)
      table.boolean('notifications').defaultsTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingsSchema
