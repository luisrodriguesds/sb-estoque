'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('like_name', 254).notNullable()
      table.string('access', 254).notNullable()
      table.string('access_slug', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('phone', 254).notNullable()
      table.integer('status', 11).notNullable().defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
