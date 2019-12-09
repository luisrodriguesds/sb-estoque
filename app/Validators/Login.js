'use strict'

class Login {
  get rules () {
    return {
      // validation rules
      email:'required',
      password:'required'
    }
  }

  get messages(){
    return {
      'email.required':'Campo vazio',
      'password.required':'Campo vazio',
    }
  }
}

module.exports = Login
