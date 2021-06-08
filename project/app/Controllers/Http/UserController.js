'use strict'

const User = use('App/Models/User')

class UserController {
  async store({request}) { //Desestruturando request do objeto ctx(context)
    //Filtrando os dados do corpo do request
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data);

    /*
      Quando passada a flag api-only na criação do projeto o Adonis
      reconhece esse retorno como um JSON
    */
    return user 
  }

}

module.exports = UserController
