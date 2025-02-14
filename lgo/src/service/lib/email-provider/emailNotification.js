const nodemailer = require("nodemailer")
const config = require('../../../config/service.config')
const HTTPUnauthorized = require("../../../exceptions/HTTPUnauthorized")

class NotificationService {

  sendOTPEmailNotification = async (data) => {
    try {
      const { toEmail, otp, type = `login into` } = data

      const transporter = nodemailer.createTransport({
        host: config.smtp_host,
        port: config.smtp_port,
        secure: (config.smtp_tls_enabled == 'true') ? true : false, // true for 465, false for other ports
        auth: {
          user: config.smtp_username,
          pass: config.smtp_password,
        },
        tls: {
          rejectUnauthorized: false, // This may help if there are certificate issues
        },
        debug: false, // Show debug output
        logger: false, // Log information to console
      })

      // Define email options
      const mailOptions = {
        from: config.smtp_username,
        to: toEmail,
        subject: "Your OTP Code",
        text: `Please use the OTP ${otp} to ${type} your Lgo account. Enter this code to complete your Process.`,
      }
      // Send email
      const info = await transporter.sendMail(mailOptions)
      return { message: "notification sent" }
    } catch (error) {
      console.error("Error sending email:", error)
      throw new HTTPUnauthorized('Unable to send Login Email OTP')
    }
  }

  sendEmailNotification = async (data) => {
    try {
      const { toEmail, text, subject, html } = data

      const transporter = nodemailer.createTransport({
        host: config.smtp_host,
        port: config.smtp_port,
        secure: config.smtp_tls_enabled == "true" ? true : false, // true for 465, false for other ports
        auth: {
          user: config.smtp_username,
          pass: config.smtp_password,
        },
        tls: {
          rejectUnauthorized: false, // This may help if there are certificate issues
        },
        debug: false, // Show debug output
        logger: false, // Log information to console
      })

      // Define email options
      const mailOptions = {
        from: config.smtp_username,
        to: toEmail,
        subject: subject || "Notification from Lets go offline",
        text: `${text}` || "",
        html: html || "",
      }
      // Send email
      const info = await transporter.sendMail(mailOptions)
      return { message: "notification sent" }
    } catch (error) {
      console.error("Error sending email:", error)
      throw new HTTPUnauthorized("Unable to send Email Notification")
    }
  }
}

module.exports = new NotificationService()
