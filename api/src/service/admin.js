const lgoHelper = require("./lib/lgoHelper")
const config = require("../config/service.config")
const HTTPBadRequest = require("../exceptions/HTTPBadRequest")
const HTTPNotFound = require("../exceptions/HTTPNotFound")
class AdminService {
    constructor() {
        this.lgoHelper = new lgoHelper(config.LGO_SERVICE)
    }

    getAllRestaurants = async (queryParams) => {
        try {
            return await this.lgoHelper.getAllRestaurants(queryParams)
        } catch (error) {
            throw error
        }
    }
    getRestaurantById = async (id) => {
        try {
            return await this.lgoHelper.getRestaurantById(id)
        } catch (error) {
            throw error
        }
    }

    postRestaurant = async (data) => {
        try {
            return await this.lgoHelper.postRestaurant(data)
        } catch (err) {
            throw err
        }
    }

    patchRestaurant = async (id, data) => {
        try {
            return await this.lgoHelper.patchRestaurant(id, data)
        } catch (err) {
            throw err
        }
    }

    getAllPos = async (queryParams) => {
        try {
            return await this.lgoHelper.getAllPos(queryParams)
        } catch (error) {
            throw error
        }
    }

    getPosById = async (id) => {
        try {
            return await this.lgoHelper.getPosById(id)
        } catch (error) {
            throw error
        }
    }

    postPos = async (data) => {
        try {
            return await this.lgoHelper.postPos(data)
        } catch (err) {
            throw err
        }
    }

    patchPos = async (id, data) => {
        try {
            return await this.lgoHelper.patchPos(id, data)
        } catch (err) {
            throw err
        }
    }

    getAllInvitations = async (queryParams) => {
        try {
            return await this.lgoHelper.getAllInvitations(queryParams)
        } catch (error) {
            throw error
        }
    }

    postRestaurantInvite = async (id, data) => {
        try {
            return await this.lgoHelper.postRestaurantInvite(id, data)
        } catch (err) {
            throw err
        }
    }

    postRestaurantReport = async (id, data) => {
        try {
            return await this.lgoHelper.postRestaurantReport(id, data)
        } catch (err) {
            throw err
        }
    }

    postRestaurantRefresh = async (id) => {
        try {
            return await this.lgoHelper.postRestaurantRefresh(id)
        } catch (err) {
            throw err
        }
    }

    getAllAdmins = async (queryParams) => {
        try {
            return await this.lgoHelper.getAllAdmins(queryParams)
        } catch (error) {
            throw error
        }
    }

    getAdminById = async (id) => {
        try {
            return await this.lgoHelper.getAdminById(id)
        } catch (error) {
            throw error
        }
    }

    postAdmin = async (data) => {
        try {
            return await this.lgoHelper.postAdmin(data)
        } catch (err) {
            throw err
        }
    }

    patchAdmin = async (id, data) => {
        try {
            return await this.lgoHelper.patchAdmin(id, data)
        } catch (err) {
            throw err
        }
    }

    deleteAdminById = async (id) => {
        try {
            return await this.lgoHelper.deleteAdmin(id)
        } catch (error) {
            throw error
        }
    }

    deleteRestaurantById = async (id) => {
        try {
            return await this.lgoHelper.deleteRestaurant(id)
        } catch (error) {
            throw error
        }
    }
}

module.exports = new AdminService()
