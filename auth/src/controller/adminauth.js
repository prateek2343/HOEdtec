const AdminAuthService = require('../service/adminauth')
const Controller = require('./Controller')
const logger = require('../logger')

const service = new AdminAuthService()

class AdminAuthController extends Controller {
    constructor(service) {
        super(service)
    }

    authenticate = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await service.authenticate(req, res)
            this.response(res, data)
        } catch (err) {
            logger.error(err.message)
            this.response(res, err, err.status)
        }
    }

    setup = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await service.setup(req)
            this.response(res, data)
        } catch (err) {
            logger.error(err.message)
            this.response(res, err, err.status)
        }
    }

    login = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {

            const data = await service.login(req.headers, req.body, res)
            super.response(res, data)
        }
        catch (err) {
            logger.error(err.message)
            super.response(res, err, err.status)
        }
    }

    validate = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await service.validate(req.headers.at || '')
            super.response(res, data)
        }
        catch (err) {
            logger.error(err.message)
            super.response(res, err, err.status)
        }
    }

    refresh = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await service.refresh(req.headers.rt || '')
            super.response(res, data)
        }
        catch (err) {
            logger.error(err.message)
            super.response(res, err, err.status)
        }
    }

    passwordReset = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await service.passwordReset(req.headers,req.body, res)
            super.response(res, data)
        }
        catch (err) {
            logger.error(err.message)
            super.response(res, err, err.status)
        }
    }

}

module.exports = new AdminAuthController(service)
