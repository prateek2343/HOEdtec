const Express = require('express')

const Router = Express.Router()
const admin = require("./admin")
const email = require('./emailHelper')

Router.use(admin)
Router.use(email)

module.exports = Router
