'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  // Campo virtual(computed)
  // Um campo que não existe na tabela mas que toda vez que mostramos um
  // arquivo ele vem junto
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
