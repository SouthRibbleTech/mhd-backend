'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
  
  Route.post('/login', 'UserController.login')
  Route.post('/register', 'UserController.register')
  Route.post('/check_username', 'UserController.checkUserName')
  Route.get('/profile/:id', 'UserController.profile').middleware('auth')
  Route.get('/mydiary/:page/:perPage', 'DiaryController.index').middleware('auth')
  Route.get('/tags/doing/:search', 'DoingTagController.searchTags').middleware('auth')
  Route.get('/tags/people/:search', 'PeopleTagController.searchTags').middleware('auth')
  Route.post('/diary', 'DiaryController.create').middleware('auth')
}).prefix('api/v1')
