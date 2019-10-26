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
  Route.get('/mydiary/:page/:perPage/:id?', 'DiaryController.index').middleware('auth')
  Route.get('/tags/doing/:search', 'DoingTagController.searchTags').middleware('auth')
  Route.get('/tags/people/:search', 'PeopleTagController.searchTags').middleware('auth')
  Route.post('/diary', 'DiaryController.create').middleware('auth')
  Route.get('/analysis/doingtagaverage', 'AnalysisController.doingTagAverage').middleware('auth')
  Route.get('/analysis/peopletagaverage', 'AnalysisController.peopleTagAverage').middleware('auth')
  Route.post('/invite', 'InviteController.create').middleware('auth')
  Route.get('/invite', 'InviteController.index').middleware('auth')
  Route.delete('/invite/:id', 'InviteController.destroy').middleware('auth')
  Route.get('/settings', 'SettingController.index').middleware('auth')
  Route.put('/settings','SettingController.update').middleware('auth')
  Route.get('/following', 'FollowingController.index').middleware('auth')
  Route.post('/following', 'FollowingController.store').middleware('auth')
  Route.put('/following/:id', 'FollowingController.update').middleware('auth')
  Route.delete('/following/:id', 'FollowingController.destroy').middleware('auth')
  Route.put('/following/block/:id', 'FollowingController.block').middleware('auth')
  Route.put('/following/unblock/:id', 'FollowingController.unblock').middleware('auth')
  Route.get('/following/counts', 'FollowingController.counts').middleware('auth')
  Route.get('/following/requests', 'FollowingController.requests').middleware('auth')
  Route.put('/following/request/:id', 'FollowingController.acceptRequest').middleware('auth')
  Route.delete('/following/request/:id', 'FollowingController.rejectRequest').middleware('auth')
  Route.get('/search/friends/:searchTerm', 'FollowingController.search').middleware('auth')

}).prefix('api/v1')
