'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  //Única rota que satisfaz todos os metodos do model Project
  Route.resource('projects', 'ProjectController').apiOnly()

  /* /projects/:projects_id/tasks/:id */
  Route.resource('projects.tasks', 'TaskController').apiOnly()
}).middleware(['auth'])
