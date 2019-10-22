'use strict'
const User = use('App/Models/User')
const Setting = use('App/Models/Setting')
class UserController {
  async register({ request, response, auth }) {
    var user = new User()
    user.username = request.body.username
    user.password = request.body.password
    user.email = request.body.email

    try {
      await user.save()
      //Check if settings already exist for this user
      //if not then create them
      await this.createSettings(user)

      var userAuth = await auth.attempt(request.body.username, request.body.password)
      return response.json({
        user: user,
        auth: userAuth,

      })
    } catch (err) {
      console.log(err)
      if (err.errno === 1062) {
        return response.json(err)
      }
    }
  }


  async login({ request, response, auth }) {
    var userAuth = await auth.attempt(request.body.username, request.body.password)
    var user = await User.query().where('username', request.body.username).first()
    //Check if settings already exist for this user
    //if not then create them
    await this.createSettings(user)

    return response.json({
      user: user,
      auth: userAuth
    })
  }

  async checkUserName({
    request,
    response
  }) {
    var user = await User.query().where('username', request.body.username).first()
    
    if (user) {
      return response.status(409).json({
        error: 'duplicate user',
        message: 'This username is already taken'
      })
    } else {
      return response.status(200).json({
        error: 'none',
        message: 'Username is available'
      })
    }
  }

  async createSettings(user) {
    var settings = user.settings().first()
    if(settings) {
      //settings already exist
      //Just return
      return
    }
    var setting = new Setting()
    await user.settings().save(setting)
    return setting
  }
}

module.exports = UserController
