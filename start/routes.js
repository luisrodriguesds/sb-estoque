'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Pagina Inicial
// Route.on('/').render('index')

//Cadastro e Autenticação
Route.group(() => { 
    
    //Render
    Route.on('/login').render('login').middleware(['guest'])
    Route.on('/forgot-password').render('forgotpass').middleware(['guest'])
    Route.on('/register').render('register').middleware(['guest'])

    //API
    Route.post('/user/store', 'UserController.store').as('user.store').validator(['StoreUser']).middleware(['guest'])
    Route.post('/user/login', 'UserController.login').as('user.login').middleware(['guest']).validator(['Login'])
    Route.post('/user/logout', 'UserController.logout').as('user.logout')
})

Route.group(() => { 
    Route.on('/dashboard').render('dashboard.dashboard').middleware(['auth'])
})
