const AdminController = require('../controller/admin')
const Express = require('express')
const cors = require('cors')

const Router = Express.Router()
const corsOptions = (methods) => {
    return {
        origin: '*',
        methods: methods,
        allowedHeaders: 'Accept, Content-Type, Origin, Referer, at',
        maxAge: 86400,
        credentials: true,
    }
}
const extractJwtClaims = require('../middleware/admin')
// Universal middleware to be performed on every request

Router.use(extractJwtClaims)

// Restaurants Route
Router.get("/restaurants", cors(corsOptions('GET')), AdminController.getAllRestaurants)
Router.get("/restaurant/:id", cors(corsOptions('GET')), AdminController.getRestaurantById)
Router.post("/restaurants", cors(corsOptions("POST")), AdminController.postRestaurant)
Router.patch("/restaurant/:id", cors(corsOptions('PATCH')), AdminController.patchRestaurant)
Router.delete("/restaurant/:id", cors(corsOptions('DELETE')), AdminController.deleteRestaurantById)

// Pos Route
Router.get("/pos", cors(corsOptions('GET')), AdminController.getAllPos)
Router.get("/pos/:id", cors(corsOptions('GET')), AdminController.getPosById)
Router.post("/pos", cors(corsOptions('POST')), AdminController.postPos)
Router.patch("/pos/:id", cors(corsOptions('PATCH')), AdminController.patchPos)

// Invite Route
Router.get("/invites", cors(corsOptions('GET')), AdminController.getAllInvitations)
Router.post("/restaurant/:id/invite", cors(corsOptions('POST')), AdminController.postRestaurantInvite)
Router.post("/restaurant/:id/report", cors(corsOptions('POST')), AdminController.postRestaurantReport)
Router.post("/restaurant/:id/refresh", cors(corsOptions('POST')), AdminController.postRestaurantRefresh)

// Team Route
Router.get("/team", cors(corsOptions('GET')), AdminController.getAllAdmins)
Router.get("/team/:id", cors(corsOptions('GET')), AdminController.getAdminById)
Router.post("/team", cors(corsOptions('POST')), AdminController.postAdmin)
Router.patch("/team/:id", cors(corsOptions('PATCH')), AdminController.patchAdmin)
Router.delete("/team/:id", cors(corsOptions('DELETE')), AdminController.deleteAdminById)

module.exports = Router
