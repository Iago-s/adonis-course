'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store({request}) { //Desestruturando request do objeto ctx(context)
    //Filtrando os dados do corpo do request
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx);
    await user.addresses().createMany(addresses, trx)

    //Se não da nenhum error nas inserções acima ele efetua as mudanças no db
    await trx.commit()

    /*
      Quando passada a flag api-only na criação do projeto o Adonis
      reconhece esse retorno como um JSON
    */
    return user 
  }

}

module.exports = UserController
