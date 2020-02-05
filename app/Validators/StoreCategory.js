'use strict'

class StoreCategory {
  get rules () {
    return {
      // validation rules
      category_name:'required',
      subcategory_name:'required'
    }
  }

  get messages(){
    return {
      'category_name.required':'Campo vazio',
      'subcategory_name.required':'Campo vazio',
    }
  }

  get validateAll () {
    return true
  }

}

module.exports = StoreCategory
