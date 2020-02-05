'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('subcategory_id')
        .unsigned()
        .references('id')
        .inTable('subcategories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('provider_id')
        .unsigned()
        .references('id')
        .inTable('providers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 254).notNullable()
      table.string('bar_code', 254)
      table.text('description', 254)
      table.string('price', 254)
      table.integer('current_stock', 254)
      table.integer('min_stock', 254)
      table.datetime('expiration_date')
      table.string('unit', 254)
      table.string('where', 254)
      table.string('image', 254)
      table.string('url', 254)
      table.string('material_type', 254)
      table.string('belongsto', 254)
      table.string('number', 254)
      table.integer('status', 11).notNullable().defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
