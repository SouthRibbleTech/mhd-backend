'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Invite extends Model {
  invitedByUser() {
    return this.belongsTo('App/Models/User', 'invited_by', 'id')
  }
  invitedUser() {
    return this.belongsTo('App/Models/User', 'invited_user', 'id')
  }
}

module.exports = Invite
