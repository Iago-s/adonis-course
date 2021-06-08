'use strict'

const Mail = use('Mail')
const User = use('App/Models/User')

const crypto = require('crypto')

class ForgotPasswordController {
  async store ({request, response}) {
    try {
      //Buscando um único campo da requisição
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save();

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('iagooliveira3845@gmail.com', 'Iago Silva')
            .subject('Recumperação de senha')
        }
      );
    } catch(err) {
      return response
        .status(err.status)
        .send({error: {message: 'Algo deu errado!'}})
    }
  }
}

module.exports = ForgotPasswordController
