
const Service = require('./Service')
const config = require('./config/service.config')
const cors = require('cors')

//add admin routes
const adminRoutes = require('./router/admin')
class AdminApiService extends Service {
    constructor(name) {
        super(name)

        this.App.use(cors({
            origin: '*'
        }))

        this.initRoutes()
    }

    initRoutes() {
        /* Load the middleware */
        this.App.use(config.ADMIN_SERVICE_BASE, adminRoutes)
    }

    start() {
        //start express service here
        super.start()
        //start rmq client service here if needed
    }
}

module.exports = AdminApiService
