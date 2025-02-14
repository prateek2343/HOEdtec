/**
 * AuthService Class
 */

const config = require("../config/service.config")
const bcrypt = require("bcryptjs")
const HTTPError = require("../exceptions/HTTPError")
const HTTPBadRequest = require("../exceptions/HTTPBadRequest")
const HTTPNoContent = require("../exceptions/HTTPNoContent")
const HTTPUnauthorized = require("../exceptions/HTTPUnauthorized")
const jwt = require("jsonwebtoken")
const HTTPForbidden = require("../exceptions/HTTPForbidden")
const OperationHelper = require("./lib/operationHandler")
const LgoServiceHelper = require("./lib/lgoHelper")

const logger = require("../logger")
const HTTPNotFound = require("../exceptions/HTTPNotFound")

class AdminAuthService {
    constructor() {
        this.lgoService = new LgoServiceHelper(config.LGO_SERVICE)
        this.operationHelper = new OperationHelper()
    }

    authenticate = async (req, res) => {
        try {
            const method = req.headers['x-original-method']
            const originalUri = req.headers['x-original-uri']
            const optionsRequested = method.toLowerCase() == 'options'
            const methodRequested = req.headers['access-control-request-method']
            const headersRequested = req.headers['access-control-request-headers']

            // Set CORS in all response
            res.set('Access-Control-Allow-Origin', '*')
            res.set('Access-Control-Max-Age', '86400')

            // Handle browser's pre-flight
            if (optionsRequested && methodRequested && headersRequested) {
                res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, POST, PUT, PATCH, DELETE')
                res.set(
                    'Access-Control-Allow-Headers',
                    'Accept, Content-Type, Origin, Referer, at'
                )
                res.set('Access-Control-Expose-Headers', 'ott')
                throw new HTTPNoContent()
            }

            const accessToken = req.headers.at || ""

            if (!accessToken.trim()) {
                throw new HTTPBadRequest("Invalid request headers")
            }

            let payload = {}

            try {
                const signingKey = config.JWT_SECRET
                payload = jwt.verify(accessToken, signingKey)
            } catch (err) {
                throw new HTTPUnauthorized("Invalid or expired access token")
            }

            let uri = '',
                targetAdmin,
                resource = ''

            const version = originalUri.split('/')[2]
            uri = originalUri.split(`api/${version}/`)[1]

            if (!uri) {
                throw new HTTPForbidden('Access denied')
            }

            // Deal with query parameters
            uri = uri.split('?')[0]
            const parameters = uri.split('/')
            //ignore first 'admin' parameter and pick up rest
            resource = parameters[1]

            targetAdmin = await this.lgoService.getAdmin(payload.username)

            // We can't find target program in the issued access token
            if ((!targetAdmin || !targetAdmin.id) && !optionsRequested) {
                throw new HTTPForbidden(
                    `Access denied: ${method} ${resource} ` + `(Token does not contain admin information)`
                )
            }
            // Option request logic
            if (optionsRequested) {
                const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"]

                res.set('Access-Control-Allow-Methods', allowedMethods.join(', '))
                res.set('Access-Control-Allow-Headers', 'Accept, Content-Type, Origin, Referer, at')
                res.set('Allow', allowedMethods.join(', '))
                throw new HTTPNoContent()
            }
            logger.info(`Applicable authentication on ${method} ${resource}`)
            return payload

        } catch (err) {
            throw err
        }
    }

    login = async (headers, data, res) => {
        try {

            if (!data?.username || !data?.password) {
                throw new HTTPBadRequest('Required field missing')
            }

            const { username, password } = data

            let admin = await this.lgoService.getAdmin(username).catch((err) => { throw new HTTPBadRequest("Admin not found.") })

            const passwordMatch = bcrypt.compareSync(
                password,
                admin.password
            )

            if (!passwordMatch) {
                throw new HTTPError(401, "Wrong Credentials")
            }

            const result = await this.generateNewToken(admin)
            return result

        } catch (err) {
            throw err
        }
    }

    generateNewToken = async (admin, signToken = true) => {
        try {

            const token = {
                id: admin?.id,
                username: admin?.username || '',
                fullName: admin?.fullName || '',
            }

            const accessToken = jwt.sign(token, config.JWT_SECRET, { expiresIn: config.AT_EXPIRY })
            const refreshToken = jwt.sign(token, config.JWT_SECRET, { expiresIn: config.RT_EXPIRY })

            if (signToken) {
                logger.info(`Token generated successfully <${admin.username}> `)
                return {
                    at: accessToken,
                    rt: refreshToken,
                    admin: token,
                }
            }
            return { admin: token }
        } catch (err) {
            throw new HTTPUnauthorized(`Invalid or expired access token`)
        }
    }

    validate = async (accessToken) => {
        try {
            if (!accessToken.trim()) {
                throw new HTTPBadRequest('Invalid request headers')
            }

            const signingKey = config.JWT_SECRET

            let payload, admin
            try {
                payload = jwt.verify(accessToken, signingKey)
                admin = await this.lgoService.getAdmin(payload.username)
            } catch (err) {
                throw new HTTPUnauthorized('Invalid or expired access token')
            }

            return await this.generateNewToken(admin, false)
        } catch (err) {
            throw err
        }
    }

    refresh = async (refreshToken) => {
        try {
            if (!refreshToken.trim()) {
                throw new HTTPBadRequest('Invalid request headers')
            }

            const signingKey = config.JWT_SECRET

            let payload, admin
            try {
                payload = jwt.verify(refreshToken, signingKey)
                admin = await this.lgoService.getAdmin(payload.username)
            } catch (err) {
                throw new HTTPUnauthorized('Invalid or expired access token')
            }

            return await this.generateNewToken(admin)

        } catch (err) {
            throw err
        }
    }

    passwordReset = async (headers, body, res) => {
        try {
            const { ott = '', otp = '' } = headers
            const realm = 'password-reset'
            const password = body.password || ''

            // Initiate password reset with given OTT
            if (ott.trim() && otp.trim()) {
                // Do password reset
                return await this.doResetPassword(password, ott, otp, realm)

            }

            const username = body.username || ''
            if (!username) throw new HTTPBadRequest('username: Required Field Missing')
            if (!username.trim()) {
                throw new HTTPBadRequest('Invalid username')
            }

            let admin
            try {
                admin = await this.lgoService.getAdmin(username)
            } catch (error) {
                throw new HTTPUnauthorized(`Invalid Admin <${username}>`)
            }

            const ottObject = {
                username: admin.username,
                otp: 'XXXXXX',
                realm: realm,
            }

            const freshOtp = this.operationHelper.generateOTP()

            const values = {
                "toEmail": username,
                "otp": freshOtp,
                "type": "Reset"
            }

            const sendOTPVarificationEmail = await this.lgoService.sendOTPVarificationEmail(values).catch((err) => {
                throw err
            })

            logger.info("FRESH OTP : " + freshOtp)

            const signingKey = config.JWT_SECRET + freshOtp

            const signedOtt = jwt.sign(ottObject, signingKey, { expiresIn: '15m' })

            // Send MFA to admin

            res.set('ott', signedOtt)
            throw new HTTPUnauthorized('Multi factor authentication required')
        } catch (error) {
            throw error
        }
    }

    doResetPassword = async (password, ott, otp, realm) => {

        let ottPayload, admin
        try {
            const signingKey = config.JWT_SECRET + otp
            ottPayload = jwt.verify(ott, signingKey)
        } catch (error) {
            throw new HTTPUnauthorized('Invalid or expired OTT')
        }

        if (ottPayload.realm != realm) throw new HTTPUnauthorized('Invalid or expired OTT')

        try {
            admin = await this.lgoService.getAdmin(ottPayload.username)
        } catch (error) {
            throw new HTTPUnauthorized(`Invalid Admin < ${ottPayload.username}> `)
        }

        if (!password) {
            throw new HTTPBadRequest('password: Required Field Missing')
        }

        try {
            return await this.lgoService.changeAdminPassword(admin.id, password)
        } catch (error) {
            logger.error('Error changing password')
            throw error
        }
    }
}

module.exports = AdminAuthService
