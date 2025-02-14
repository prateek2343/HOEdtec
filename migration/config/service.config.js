const dotenv = require('dotenv')
const path = require('path')

//resolve environment variable
dotenv.config({
    path: path.resolve(__dirname, `${process.env.ENV}.env`),
})

//export various environment varaibles from here
module.exports = {
    ENV: process.env.ENV || 'local',
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_USER: process.env.DB_USER || 'lgo',
    DB_PASS: process.env.DB_PASS || 'lgo@123',
    DB_NAME: process.env.DB_NAME || 'lgo',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
    DB_PORT: process.env.DB_PORT || '3306',
    POOL_MAX: parseInt(process.env.POOL_MAX) || 5,
    POOL_MIN: parseInt(process.env.POOL_MIN) || 0,
    POOL_ACQUIRE: parseInt(process.env.POOL_ACQUIRE) || 30000,
    POOL_IDLE: parseInt(process.env.POOL_IDLE) || 10000,
}
