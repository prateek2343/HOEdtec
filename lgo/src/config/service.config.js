const dotenv = require('dotenv')
const path = require('path')

//resolve environment variable
dotenv.config({
    path: path.resolve(__dirname, `${process.env.ENV}.env`),
})

//export various environment varaibles from here
module.exports = {
    ENV: process.env.ENV || 'local',
    SERVICE_NAME: process.env.SERVICE_NAME || 'lgo',
    SERVICE_BASE: process.env.SERVICE_BASE || '/lgo',
    SERVICE_VERSION: process.env.SERVICE_VERSION || '1.0.0',
    DB_HOST: process.env.DB_HOST || '',
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_DIALECT: 'mysql',
    DB_PORT: process.env.DB_PORT || '',
    POOL_MAX: parseInt(process.env.POOL_MAX) || 5,
    POOL_MIN: parseInt(process.env.POOL_MIN) || 0,
    POOL_ACQUIRE: parseInt(process.env.POOL_ACQUIRE) || 30000,
    POOL_IDLE: parseInt(process.env.POOL_IDLE) || 10000,
    smtp_host: process.env.smtp_host || 'smtp.gmail.com',
    smtp_port: process.env.smtp_port || 587,
    smtp_tls_enabled: process.env.smtp_tls_enabled || false,
    smtp_username: process.env.smtp_username || "mr.rohit.kalra1980@gmail.com",
    smtp_password: process.env.smtp_password || "hmaizzrpmfbovqjc",
    POS_CONNECT_URL : process.env.POS_CONNECT_URL || "https://clover.letsgetoffline.com/connect",
    ISS: process.env.ISS || 'Lets Get Offline',
    INVITE_TOKEN_EXPIRY:process.env.INVITE_TOKEN_EXPIRY || '7d',
    INVITE_TOKEN_SECRET: process.env.INVITE_TOKEN_SECRET || "lgo_secret",
    CLOVER_BASE: process.env.CLOVER_BASE || 'https://api.clover.com'
}
