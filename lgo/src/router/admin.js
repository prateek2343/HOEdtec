/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const AdminController = require('../controller/admin')
const Express = require('express')
const Router = Express.Router()

const { failIfLimitAndOffsetAreInvalid, validate } = require('../validator')

/* List all routes here*/
/* List all user routes here*/
Router.get('/v1/admin',
    [failIfLimitAndOffsetAreInvalid, validate], // validation middleware
    AdminController.getAll) // Controller function

Router.get('/v1/admin/:id', AdminController.get)
Router.post('/v1/admin', AdminController.post)
Router.put('/v1/admin/:id', AdminController.put)
Router.patch('/v1/admin/:id', AdminController.patch)
Router.delete('/v1/admin/:id', AdminController.delete)

module.exports = Router
