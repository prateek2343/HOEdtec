const logger = require("../logger")
const EmailService = require("./lib/email-provider/emailNotification") 

class EmailHelper {
  constructor() {}

  async sendOTPEmailNotification(data) {
    try {
      const result = await EmailService.sendOTPEmailNotification(data) 
      return result
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async sendEmailNotification(data) {
    try {
      const result = await EmailService.sendEmailNotification(data) 
      return result
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

module.exports = new EmailHelper()
