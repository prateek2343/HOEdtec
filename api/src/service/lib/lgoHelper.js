const axios = require("axios")
const AxiosHelper = require("./axiosHelper")

class LgoHelper extends AxiosHelper {
  constructor(lgoHelper) {
    super()
    this.lgoHelper = lgoHelper
  }

  getAllRestaurants = async (queryParams) => {
    try {
      const result = await axios.get(`${this.lgoHelper}/v1/restaurants`, {
        params: queryParams,
      })
      return result.data
    } catch (error) {
      this.handle(error)
    }
  }

  getRestaurantById = async (id) => {
    try {
      const res = await axios.get(`${this.lgoHelper}/v1/restaurants/${id}`)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  postRestaurant = async (data) => {
    try {
      const res = await axios.post(`${this.lgoHelper}/v1/restaurants`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  patchRestaurant = async (id, data) => {
    try {
      const res = await axios.patch(`${this.lgoHelper}/v1/restaurants/${id}`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  getAllPos = async (queryParams) => {
    try {
      const result = await axios.get(`${this.lgoHelper}/v1/pos`, {
        params: queryParams,
      })
      return result.data
    } catch (error) {
      this.handle(error)
    }
  }

  getPosById = async (id) => {
    try {
      const res = await axios.get(`${this.lgoHelper}/v1/pos/${id}`)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  postPos = async (data) => {
    try {
      const res = await axios.post(`${this.lgoHelper}/v1/pos`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  patchPos = async (id, data) => {
    try {
      const res = await axios.patch(`${this.lgoHelper}/v1/pos/${id}`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  getAllInvitations = async (queryParams) => {
    try {
      const result = await axios.get(`${this.lgoHelper}/v1/invites`, {
        params: queryParams,
      })
      return result.data
    } catch (error) {
      this.handle(error)
    }
  }

  postRestaurantInvite = async (id, data) => {
    try {
      const res = await axios.post(`${this.lgoHelper}/v1/invite/${id}`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  verifyClient = async (queryParams) => {
    try {
      const res = await axios.get(`${this.lgoHelper}/v1/client/verify`, {
        params: queryParams
      })
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  postClientToken = async (data) => {
    try {
      const res = await axios.post(`${this.lgoHelper}/v1/client/token`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  postClientToken = async (data) => {
    try {
      const res = await axios.post(`${this.lgoHelper}/v1/client/token`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  postRestaurantReport = async (id, data) => {
    try {
      const res = await axios.post(`${this.lgoHelper}/v1/restaurants/${id}/report`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  postRestaurantRefresh = async (id) => {
    try {
      const res = await axios.post(`${this.lgoHelper}/v1/restaurants/${id}/refresh`,)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  getAllAdmins = async (queryParams) => {
    try {
      const result = await axios.get(`${this.lgoHelper}/v1/admin`, {
        params: queryParams,
      })
      return result.data
    } catch (error) {
      this.handle(error)
    }
  }

  getAdminById = async (id) => {
    try {
      const res = await axios.get(`${this.lgoHelper}/v1/admin/${id}`)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  postAdmin = async (data) => {
    try {
      const res = await axios.post(`${this.lgoHelper}/v1/admin`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  patchAdmin = async (id, data) => {
    try {
      const res = await axios.patch(`${this.lgoHelper}/v1/admin/${id}`, data)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  deleteAdmin = async (id) => {
    try {
      const res = await axios.delete(`${this.lgoHelper}/v1/admin/${id}`)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }

  deleteRestaurant = async (id) => {
    try {
      const res = await axios.delete(`${this.lgoHelper}/v1/restaurants/${id}`)
      return res.data
    } catch (err) {
      this.handle(err)
    }
  }
}

module.exports = LgoHelper
