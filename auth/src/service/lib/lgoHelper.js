/**
 * Config Service Helper
 */
const axios = require('axios')
const AxiosHelper = require('./axiosHelper')
const qs = require('qs')
const HTTPNotFound = require("../../exceptions/HTTPNotFound")
const bcrypt = require("bcryptjs")

class LgoServiceHelper extends AxiosHelper {
    constructor(lgoService) {
        super()
        this.lgoService = lgoService
    }

    getAdmin = async (param) => {
        try {
            const admin = await axios.get(`${this.lgoService}/v1/admin/${param}`)
            return admin.data
        } catch (error) {
            this.handle(error)
        }
    }

    changeAdminPassword = async (id, password) => {
        try {
            password = bcrypt.hashSync(password, 10)
            await this.patchAdmin(id, { password: password })
            return { message: 'Password Updated Successfully' }
        } catch (error) {
            throw new HTTPNotFound('Invalid user')
        }
    }

    sendOTPVarificationEmail = async (data) => {
        try {
            const result = await axios.post(`${this.lgoService}/v1/otp/email`, data)
            return result.data
        } catch (error) {
            this.handle(error)
        }
    }

    patchAdmin = async (id, data) => {
        try {
            const result = await axios.patch(`${this.lgoService}/v1/admin/${id}`, data)
            return result.data
        } catch (err) {
            this.handle(err)
        }
    }
}

module.exports = LgoServiceHelper
