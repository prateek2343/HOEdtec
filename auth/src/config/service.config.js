const dotenv = require("dotenv")
const path = require("path")

//resolve environment variable
dotenv.config({
  path: path.resolve(__dirname, `${process.env.ENV}.env`),
})

//export various environment varaibles from here
module.exports = {
  ENV: process.env.ENV || "local",
  SERVICE_NAME: process.env.SERVICE_NAME || "auth",
  SERVICE_VERSION: process.env.SERVICE_VERSION || "1.0.0",
  BUILD_NUMBER: process.env.BUILD_NUMBER || "#",
  SERVICE_BASE: process.env.SERVICE_BASE || "/api/v1/auth",
  LGO_SERVICE: process.env.LGO_SERVICE || 'http://lgo-service:3000/lgo',
  MAX_RETRIES: process.env.MAX_RETRIES || 1,
  RETRY_DELAY: process.env.RETRY_DELAY || 500,
  JWT_SECRET: process.env.JWT_SECRET || "lgo_secret",
  AT_EXPIRY: process.env.AT_EXPIRY || "15m",
  RT_EXPIRY: process.env.RT_EXPIRY || "7d"
}
