/**
 * This File Serves As The routes definition for
 * managing demo routes on various resource.
 */

const AdminAuthController = require('../controller/adminauth')
const Express = require('express')
const cors = require("cors")
const Router = Express.Router()

const corsOptions = (methods) => {
    return {
        origin: '*',
        methods: methods,
        allowedHeaders: 'Accept, Content-Type, Origin, Referer, Authorization, ott, otp, at, rt',
        exposedHeaders: 'ott',
        maxAge: 86400,
    };
};

/**
 * This route authenticates the 
 * access token and checks if the caller 
 * has permisisons.
 */
Router.get('/admin/authenticate', AdminAuthController.authenticate)

/**
 * This route checks the credentials and 
 * issues an access token and a refresh token
 */

Router.options('/admin/setup', cors(corsOptions('GET')))
Router.get('/admin/setup', AdminAuthController.setup)


/**
 * This route checks the credentials and 
 * issues an access token and a refresh token
 */

Router.options('/admin/login', cors(corsOptions('POST')))
Router.post('/admin/login', AdminAuthController.login)

/**
 * This route checks the access token and refresh token
 * in the request and responds 200 if token is valid.
 * 
 * Responds 401 if token has expired. 
 */
Router.options('/admin/validate', cors(corsOptions('GET')))
Router.get('/admin/validate', AdminAuthController.validate)

/**
 * This route returns the new access token given a 
 * valid refresh token. 
 * 
 * Returns 401 if the refresh token is also expired.
 */
Router.options('/admin/refresh', cors(corsOptions('GET')))
Router.get('/admin/refresh', AdminAuthController.refresh)

Router.options('/admin/password/reset', cors(corsOptions('POST')))
Router.post('/admin/password/reset',AdminAuthController.passwordReset)


module.exports = Router
