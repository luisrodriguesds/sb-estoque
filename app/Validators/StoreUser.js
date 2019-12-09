'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
      name:'required|min:3|max:240',
      like_name:'required|min:3|max:240',
      email:'required|email|unique:users',
      password:'required|min:6|confirmed',
    }
  }

  get messages (){
    return {
      'name.required':'Campo obrigatório',
      'name.min':'Campo com mínimo de 3 caracteres',
      'name.max':'Campo com máximo de 240 caracteres',
      'like_name.required':'Campo obrigatório',
      'like_name.min':'Campo com mínimo de 3 caracteres',
      'like_name.max':'Campo com máximo de 240 caracteres',
      'email.required':'Campo obrigatório',
      'email.email':'Email inválido',
      'email.unique':'Este email já existe',
      'password.required':'Campo obrigatório',
      'password.confirmed':'As senhas não corresposndem',
      'password.min':'Senha com mínimo de 6 caracteres!',
    }
  }
}

module.exports = StoreUser
