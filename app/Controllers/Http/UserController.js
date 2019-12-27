'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    return view.render('dashboard.users-index')
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('register')
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    try {
      await User.create({
        name:request.input('name'),
        like_name:request.input('like_name'),
        email:request.input('email'),
        password:request.input('password'),
        phone:request.input('phone'),
        access:'Operador',
        access_slug:'operador',
        status:2
      });
      //Status -> 0: Inativo, 1:Ativo, 2:Pendente
      //Mail para o professor Sasaki Liberar a entrada no sistema

      session.flash({ notification: 'Conta criada com sucesso! Verifique sua caixa de email!' })
      return response.redirect('/login');
      
    } catch (error) {
      session.flash({ notification: 'Algo inesperado acontaceu! Por favor entre em contato com o laboratório.' })
      return response.redirect('/login');
    }

  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  /**
   * Login with email and password
   * POST users/login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login ({request, auth, session, response}){
    const {email=null} = request.all()
    
    //Check if status is 1
    const user = await User.findBy('email',email)
    if (user.toJSON().status !== 1) {
      session.flash({ notification: `Você não pode acessar o sistema pois seu status é ${(user.toJSON().status == 2 ? 'Pendênte' : 'Inativo')}` })
      return response.redirect('/login');
    }

    await auth.attempt(request.input('email'), request.input('password'))

    session.flash({ notification: 'Login efetuado com sucesso!' })
    return response.redirect('/dashboard');
  }

  async logout({request, auth, response}){
    await auth.logout();

    return response.redirect('/login')
  }

}

module.exports = UserController
