/**
 * UserService Class
 */

const Service = require("./Service")
const bcrypt = require("bcryptjs")
const HTTPNotFound = require("../exceptions/HTTPNotFound")
const HTTPBadRequest = require("../exceptions/HTTPBadRequest")
const HTTPForbidden = require("../exceptions/HTTPForbidden")
const HTTPInternalServerError = require("../exceptions/HTTPInternalServerError")
const Sequelize = require("sequelize")
const { Op } = require("sequelize")
const teams = require("../models/Teams")

class AdminService extends Service {
    constructor(model) {
        super(model)
    }

    getAll = async (queryParams) => {
        try {
            const {
                filter = {},
                search,
                sortField,
                sortOrder,
                limit,
                offset = 0,
            } = queryParams
            const attributes = this.model.getAttributes()
            const searchableColumns = [],
                dateTimeColumns = []

            for (const [key, value] of Object.entries(attributes)) {
                if (
                    value.type instanceof Sequelize.DATE ||
                    value.type instanceof Sequelize.BOOLEAN
                ) {
                    dateTimeColumns.push(key)
                    continue
                }
                searchableColumns.push(key)
            }

            filter.deleted = filter.deleted ?? false

            const fullQuery = [];
            // Include existing filter conditions
            for (const key in filter) {
                if (filter[key] == "null") {
                    fullQuery.push({ [key]: { [Op.is]: null } })
                }
                else {
                    fullQuery.push({ [key]: filter[key] })
                }
            }

            if (search) {
                const searchQuery = []
                searchableColumns.forEach((column) => {
                    searchQuery.push({
                        [column]: { [Op.like]: `%${search}%` },
                    })
                })
                fullQuery.push({
                    [Op.or]: searchQuery,
                })
            }

            const query = {}
            query.where = { [Op.and]: fullQuery }

            // Apply searching
            if (search) {
                query.where = { [Op.and]: fullQuery }
            }

            // Apply sorting
            if (sortField) {
                const direction = ['asc', 'desc'].includes(sortOrder?.toLowerCase()) ? sortOrder : 'asc';
                query.order = [[sortField, direction]];
            }

            // Apply pagination
            if (limit) {
                query.limit = parseInt(limit)
                query.offset = parseInt(offset)
            }

            const result = await this.model.findAndCountAll(query)

            if (result.length == 0) {
                throw new HTTPNotFound()
            }

            return result
        } catch (error) {
            this.handle(error)
        }
    }

    get = async (id) => {
        try {
            const result = await this.findByIdKey(id)

            if (!result) throw new HTTPNotFound(`Not Found <${id}>`)

            return result
        } catch (error) {
            this.handle(error)
        }
    }

    post = async (data) => {
        try {
            const user = await this.findByIdKey(data.username)

            if (user)
                throw new HTTPBadRequest(
                    `Admin already exist with ${data.username}`
                )

            data.password = bcrypt.hashSync(data.password, 10)
            const result = await this.model.create(data)

            if (!result)
                throw new HTTPInternalServerError(
                    `Failed to create user with email <${data.username}>`
                )

            return await this.findByIdKey(data.username)
        } catch (error) {
            console.log(error);
            this.handle(error)
        }
    }

    put = async (data) => {
        throw new HTTPForbidden()
    }

    patch = async (id, data) => {
        try {
            const user = await this.findByIdKey(id)

            if (!user) throw new HTTPNotFound(`User not found <${id}>`)

            if (data.password) {
                data.password = bcrypt.hashSync(data.password, 10)
            }

            const result = await this.model.update(
                { ...user, ...data },
                {
                    where: { id: parseInt(id) },
                    returning: true, // Return the updated record
                    plain: true, // Return only the plain JSON object
                }
            )

            if (!result)
                throw new HTTPInternalServerError(
                    `Failed to update user <${id}>`
                )

            return await this.findByIdKey(id)
        } catch (error) {
            this.handle(error)
        }
    }

    delete = async (id) => {
        try {
            const user = await this.findByIdKey(id)

            if (user.default) throw new HTTPForbidden(`Not Allowed to Delete`)

            if (!user) throw new HTTPNotFound(`User not found <${id}>`)

            const result = await this.model.update(
                {
                    deleted: true,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )

            if (!result)
                throw new HTTPInternalServerError(
                    `Failed to delete user <${id}>`
                )

            user.deleted = true

            return user
        } catch (error) {
            this.handle(error)
        }
    }

    findByIdKey = async (key) => {

        const user = await this.model.findOne({
            where: Sequelize.and(
                { deleted: 0 },
                Sequelize.or({ id: key }, { username: key })
            ),
        })

        return user
    }

}

module.exports = new AdminService(teams)
