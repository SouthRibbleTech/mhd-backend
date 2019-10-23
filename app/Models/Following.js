'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Following extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  followingUser() {
    return this.belongsTo('App/Models/User', 'other_user_id', 'user_id')
  }
}

module.exports = Following
