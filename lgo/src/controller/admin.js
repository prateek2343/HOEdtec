// Example usage in a route or controller
const Controller = require('./Controller')
const service = require('../service/admin')
class AdminController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new AdminController(service)
