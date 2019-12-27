'use strict'

/*
|--------------------------------------------------------------------------
| GlobalSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash');
const Database = use('Database');
const dateformat = use('dateformat');

class GlobalSeeder {
  async run () {
    const datenow = dateformat(Date.now(), 'yyyy-mm-dd HH:MM:ss');

     //User root
     await Database.table('users').insert({
      name:'root',
      like_name:'root',
      email:'root@root.com',
      password: await Hash.make('10050621'),
      access:'Administrador',
      access_slug:'administrador',
      phone:'(85)997646060',
      created_at:datenow,
      updated_at:datenow,
    });
  }
}

module.exports = GlobalSeeder
