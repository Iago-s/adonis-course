'use strict'

const Antl = use('Antl')

class User {
  /*
    Com o metodo validateAll ele faz com que todos os campos sejam
    validados no mesmo tempo
  */
  get validateAll () {
    return true
  }

  /*
    Por padrão o adonis encontra um primeiro campo que não atende
    a validação e para
  */
  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
