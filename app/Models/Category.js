'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model       = use('Model')
const dateformat  = use('dateformat')

class Category extends Model {
  getCreatedAt(created_at){
    return dateformat(created_at, "dd/mm/yyyy");
  }
//Relacoes
  subcategory(){
    return this.hasMany('App/Models/Subcategory')
  }
}

module.exports = Category
