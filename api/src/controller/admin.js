const service = require("../service/admin")
const Controller = require("./Controller")
const logger = require("../logger")

class AdminController extends Controller {
    constructor(service) {
        super(service)
        this.service = service
    }
    getAllRestaurants = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)
        try {
            const data = await this.service.getAllRestaurants(req.query)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }
    getRestaurantById = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.getRestaurantById(req.params.id)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    postRestaurant = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.postRestaurant(req.body)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    patchRestaurant = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.patchRestaurant(req.params.id, req.body)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    getAllPos = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)
        try {
            const data = await this.service.getAllPos(req.query)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    getPosById = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.getPosById(req.params.id)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    postPos = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.postPos(req.body)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    patchPos = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.patchPos(req.params.id, req.body)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    getAllInvitations = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)
        try {
            const data = await this.service.getAllInvitations(req.query)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    postRestaurantInvite = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.postRestaurantInvite(req.params.id, req.body)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    postRestaurantReport = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.postRestaurantReport(req.params.id, req.body)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    postRestaurantRefresh = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)
        try {
            const data = await this.service.postRestaurantRefresh(req.params.id)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    deleteRestaurantById = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.deleteRestaurantById(req.params.id)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    getAllAdmins = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)
        try {
            const data = await this.service.getAllAdmins(req.query)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    getAdminById = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.getAdminById(req.params.id)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    postAdmin = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.postAdmin(req.body)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }

    patchAdmin = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.patchAdmin(req.params.id, req.body)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }
    
    deleteAdminById = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            const data = await this.service.deleteAdminById(req.params.id)
            this.response(res, data)
        } catch (err) {
            this.response(res, err, err.status)
        }
    }
}

module.exports = new AdminController(service)
