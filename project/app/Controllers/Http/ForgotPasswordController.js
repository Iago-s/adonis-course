'use strict'

const Mail = use('Mail')
const User = use('App/Models/User')
const Env = use('Env')

const crypto = require('crypto')
const moment = require('moment')

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
            .from(Env.get('EMAIL'), 'Iago Silva')
            .subject('Recumperação de senha')
        }
      );
    } catch(err) {
      return response
        .status(err.status)
        .send({error: {message: 'Algo deu errado!'}})
    }
  }

  async update ({request, response}) {
    try {
      const {token, password} = request.all();
      const user = await User.findByOrFail('token', token);

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if(tokenExpired) {
        return response
          .status(401)
          .send({error: {message: 'O token de validação está expirado'}})  
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch(err) {
      return response
        .status(err.status)
        .send({error: {message: 'Algo deu errado ao resetar sua senha!'}})
    }
  }
}

module.exports = ForgotPasswordController
