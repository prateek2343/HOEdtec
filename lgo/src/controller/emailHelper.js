const logger = require("../logger")
const service = require("../service/emailHelper")
const Controller = require("./Controller")

class EmailController extends Controller {
  constructor(service) {
    super(service)
  }
  sendOTPEmailNotification = async (req, res) => {
    logger.info(`Received ${req.method} ${req.url}`)
    try {
      const result = await this.service.sendOTPEmailNotification(req.body)
      this.response(res, result)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  sendEmailNotification = async (req, res) => {
    logger.info(`Received ${req.method} ${req.url}`)
    try {
      const result = await this.service.sendEmailNotification(req.body)
      this.response(res, result)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

module.exports = new EmailController(service)
