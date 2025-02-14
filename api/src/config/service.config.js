const dotenv = require('dotenv')
const path = require('path')

//resolve environment variable
dotenv.config({
    path: path.resolve(__dirname, `${process.env.ENV}.env`),
})

//export various environment varaibles from here
module.exports = {
    ENV: process.env.ENV || 'local',
    SERVICE_NAME: process.env.SERVICE_NAME || 'api',
    ADMIN_SERVICE_BASE: process.env.ADMIN_SERVICE_BASE || '/api/v1/admin',
    CLIENT_SERVICE_BASE: process.env.CLIENT_SERVICE_BASE || '/api/v1/client',
    SERVICE_VERSION: process.env.SERVICE_VERSION || '1.0.0',
    LGO_SERVICE: process.env.LGO_SERVICE || 'http://lgo-service:3000/lgo'
}
