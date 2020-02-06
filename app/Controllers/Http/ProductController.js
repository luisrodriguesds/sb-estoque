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
    const {page=1, perPage=50, search=null, category=null, subcategory=null} = request.all()
    const cat = await Category.query().fetch()
    let prod, sub
    
    if (category == null || category == 'all') {
      sub = await Subcategory.query().where('category_id', 1).fetch()
      prod= await Product.query().with('provider').with('category').with('subcategory').paginate(page, perPage)      
    }else{
      sub = await Subcategory.query().where('category_id', category).fetch()
      if (subcategory == null) {
        prod = await Product.query().where('category_id', category).with('provider').with('category').with('subcategory').paginate(page, perPage)
      }else{
        prod = await Product.query().where('category_id', category).andWhere('subcategory_id', subcategory).with('provider').with('category').with('subcategory').paginate(page, perPage)
      }
    }

    if (search != null) {
      prod= await Product.query().where('name', 'like', '%'+search+'%').with('provider').with('category').with('subcategory').paginate(page, perPage)         
    }

    return view.render('dashboard.products-index', {prods:prod.toJSON(), categories:cat.toJSON(), subcategories:sub.toJSON()})
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

  async change ({ params, request, response, session }) {
    const {type, id} = params
    const prod = await Product.findBy('id',id)
    try {
      switch (type) {
        case 'plus':
          await Product.query().where('id', id).update({current_stock: prod.toJSON().current_stock+1})
        break;
        default:
          if (prod.toJSON().current_stock != 0) {
            await Product.query().where('id', id).update({current_stock: prod.toJSON().current_stock-1})
          }        
        break;
      }

      session.flash({ notification: 'O Produto '+prod.toJSON().name+' foi atualizado com sucesso', color:'success' })
      return response.redirect('/produtos')
    } catch (error) {
      console.log(error)
      session.flash({ notification: 'Algo inesperado aconteceu, por favor entre em contato com o suporte.', color:'danger' })
      return response.redirect('/produtos')
    }
    
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
    console.log(prod.toJSON())
    return prod
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
