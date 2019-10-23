'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  diaryEnteries () {
    return this.hasMany('App/Models/Diary')
  }

  doingTags () {
    return this.belongsToMany('App/Models/DoingTag')
  }

  peopleTags() {
    return this.belongsToMany('App/Models/PeopleTag')
  }

  invitesSent() {
    return this.hasMany('App/Models/Invite', 'id', 'invited_by')
  }

  invitesReceived() {
    return this.hasMany('App/Models/Invite', 'id', 'invited_user')
  }

  settings() {
    return this.hasOne('App/Models/Setting')
  }

  following() {
    return this.hasMany('App/Models/Following')
  }

  followers() {
    return this.hasMany('App/Models/Follower')
  }
}

module.exports = User
