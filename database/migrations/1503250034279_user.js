'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).unique()
      table.string('password', 60).notNullable()
      table.string('first_name', 75)
      table.string('last_name', 75)
      table.string('phone_mobile',25)
      table.string('phone_home',25)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
