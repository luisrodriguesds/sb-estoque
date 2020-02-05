'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category    = use('App/Models/Category')
const Subcategory = use('App/Models/Subcategory')
/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return view.render('dashboard.category-index')
  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

    return view.render('dashboard.category-store')
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    var slugify = use('slugify')
    const cat   = request.only(['category_name', 'category_thumb'])
    let subcat  = request.only(['subcategory_name', 'subcategory_thumb'])
    if (!Array.isArray(subcat.subcategory_name)) {
      subcat.subcategory_name = [subcat.subcategory_name]
    }

    console.log(request.all())

    //Check
    const check = await Category.findBy('name_slug',slugify(cat.category_name, {lower:true}))
    if (check != null) {
      session.flash({ notification: 'A Categoria '+cat.category_name+' já existe na base de dados.', color:'danger' })
      return response.redirect('/categorias/cadastrar')
    }
    
    //Subcategorias não repetidas 
    //Check se existe alguma opção igual
    if (hasDuplicates(subcat.subcategory_name)) {
      session.flash({ notification: 'Opção duplicada.', color:'danger' })
      return response.redirect('/categorias/cadastrar')
    }

    try {
      const {id} = await Category.create({name:cat.category_name, name_slug:slugify(cat.category_name, {lower:true}), thumb:cat.category_thumb})
      await Promise.all(subcat.subcategory_name.map(async (v,i) => {
        await Subcategory.create({category_id:id, name:v, name_slug:slugify(v, {lower:true}), thumb:null})
      }))

      session.flash({ notification: 'Categoria e Subcategorias cadastradas com sucesso', color:'success' })
      return response.redirect('/categorias/cadastrar')
    } catch (error) {
      console.log(error)
      session.flash({ notification: 'Algo inesperado aconteceu', color:'danger' })
      return response.redirect('/categorias/cadastrar')
    }
   
    function hasDuplicates(array) {
      return (new Set(array)).size !== array.length;
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  async show_api ({ params, request, response, view }) {
    const cat = await Category.query().where('id', params.id).with('subcategory').fetch()
    return cat
  }

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CategoryController
