'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const dateformat = use('dateformat');

class Product extends Model {

    getExpirationDate(expiration_date){
        return dateformat(expiration_date, "yyyy-mm-dd");
    }

    provider(){
        return this.belongsTo('App/Models/Provider')
    }

    category(){
        return this.belongsTo('App/Models/Category')
    }

    subcategory(){
        return this.belongsTo('App/Models/Subcategory')
    }
}

module.exports = Product
