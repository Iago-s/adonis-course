'use strict'

const Raven = require('raven')

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Config = use('Config')

//Formatador de erros
const Youch = use('youch')

class ExceptionHandler extends BaseExceptionHandler {
  /*
    O que queremos retornar ao usuário final
  */ 
  async handle (error, { request, response }) {
    // Se for um erro de validação
    if(error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if(Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }

    return response.status(error.status)
  }

  /*
    O que queremos fazer com esse erro, exemplo armazena em algum lugar para usar
    com outras ferramentas que lida com correçoes de erros
  */
  async report (error, { request }) {
    //Raven.config(Config.get('services.sentry.dsn'))
    //Raven.captureException(error)
  }
}

module.exports = ExceptionHandler
