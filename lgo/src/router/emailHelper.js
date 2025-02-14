const EmailController = require("../controller/emailHelper")
const Express = require("express")
const Router = Express.Router()

Router.post("/v1/otp/email", EmailController.sendOTPEmailNotification)

Router.post("/v1/email", EmailController.sendEmailNotification)

module.exports = Router