'use strict'
const User = use('App/Models/User')
class UserController {
  async register({ request, response, auth }) {
    var user = new User()
    user.username = request.body.username
    user.password = request.body.password
    user.email = request.body.email

    try {
      await user.save()
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
    console.log(request.body.username, request.body.password)
    var userAuth = await auth.attempt(request.body.username, request.body.password)
    console.log("Token", userAuth)
    var user = await User.query().where('username', request.body.username).first()
    console.log("User", user)
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
    console.log(user)
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
}

module.exports = UserController
