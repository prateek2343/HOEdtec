const admin = require('./adminauth')
const Express = require('express')

const Router = Express.Router()

Router.use(admin)

module.exports = Router
