'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product     = use('App/Models/Product')
const Category    = use('App/Models/Category')
const Subcategory = use('App/Models/Subcategory')
const Provider    = use('App/Models/Provider')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const prod = await Product.query().with('provider').with('category').with('subcategory').fetch()
    return view.render('dashboard.products-index', {prods:prod.toJSON()})
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const categories  = await Category.query().with('subcategory').fetch()
    const provider    = await Provider.query().fetch()
    return view.render('dashboard.products-store', {categories:categories.toJSON(), subcategories:categories.toJSON()[0].subcategory, provideres:provider.toJSON()})
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async store ({ request, response, session }) {
    const data = request.only([
      'category_id',
      'subcategory_id',
      'name',
      'provider_id',
      'bar_code',
      'description',
      'price',
      'current_stock',
      'min_stock',
      'expiration_date',
      'unit',
      'where',
      'image',
      'url',
      'material_type',
      'belongsto',
      'number',
    ])
    console.log(data)
    //Bar code
    const prod = await Product.findBy('bar_code',data.bar_code)
    if (prod != null) {
      try {
        await Product.query().where('bar_code', data.bar_code).update(data)
        session.flash({ notification: 'Produto atualizado com successo', color:'success' })
        return response.redirect('/produtos/cadastrar')
      } catch (error) {
        console.log(error)
        session.flash({ notification: 'Algo inesperado aconteceu, por favor entre em contato com o suporte.', color:'danger' })
        return response.redirect('/produtos/cadastrar')
      }
    }
    //image

    //Store
    try {
      await Product.create(data)
      session.flash({ notification: 'Produto cadastrado com sucesso!', color:'success' })
      return response.redirect('/produtos/cadastrar')
    } catch (error) {
      console.log(error)
      session.flash({ notification: 'Algo inesperado aconteceu, por favor entre em contato com o suporte.', color:'danger' })
      return response.redirect('/produtos/cadastrar')
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  async show_api ({ params, request, response, view }) {
    const {code} = params
    const prod = await Product.query().where('bar_code',code).with('provider').with('category').with('subcategory').fetch()
    return prod;
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProductController
