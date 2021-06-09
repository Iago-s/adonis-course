'use strict'

const Kue = use('kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) {
    return
  }

  const {email, username} = await taskInstance.user().fetch()
  const {title} = await taskInstance
  const file = await taskInstance.file().fetch()

  Kue.dispatch(Job.key, {email, username, title, file}, {attempts: 3})
}
