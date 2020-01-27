'use strict'

class StoreProduct {
  get rules () {
    return {
      // validation rules
      bar_code:'required|min:2',
      provider_id:'required|min:1',
      category_id:'required|min:1',
      subcategory_id:'required|min:1',
      name:'required|min:2',
      current_stock:'required|min:0',
      min_stock:'required|min:0',
      unit:'required|min:1',
    }
  }

  get messages (){
    return {
      'bar_code.required':'Campo obrigatório',
      'bar_code.min':'Campo com mínimo de 2 caracteres',
      'name.required':'Campo obrigatório',
      'name.min':'Campo com mínimo de 2 caracteres',
      'provider_id.required':'Campo obrigatório',
      'provider_id.min':'Campo com mínimo de 1 caracteres',
      'category_id.required':'Campo obrigatório',
      'category_id.min':'Campo com mínimo de 2 caracteres',
      'subcategory_id.required':'Campo obrigatório',
      'subcategory_id.min':'Campo com mínimo de 2 caracteres',
      'current_stock.required':'Campo obrigatório',
      'current_stock.min':'Campo com mínimo de 2 caracteres',
      'min_stock.required':'Campo obrigatório',
      'min_stock.min':'Campo com mínimo de 2 caracteres',
      'unit.required':'Campo obrigatório',
      'unit.min':'Campo com mínimo de 2 caracteres',
    }
  }

  get validateAll () {
    return true
  }

}

module.exports = StoreProduct
