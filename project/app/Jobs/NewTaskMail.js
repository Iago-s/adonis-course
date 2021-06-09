'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')
const Env = use('Env')

class NewTaskMail {
  /*Quantos Jobs deseja processar simultaneamente*/
  static get concurrency () {
    return 1
  }

  // Chave única que indetifica cada Job
  static get key () {
    return 'NewTaskMail-job'
  }

  // Logica
  async handle ({username, email, title, file}) {
    await Mail.send(
      ['emails.new_task'],
      {
        username,
        title,
        hasAttachment: !!file
      }, 
      message => {
        message
          .to(email)
          .from(Env.get('EMAIL'))
          .subject('Nova task criada')
        
        if(file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }
    )
  }
}

module.exports = NewTaskMail

