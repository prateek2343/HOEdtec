// models/Admin.js
const { DataTypes } = require('sequelize')
const { sequelize } = require('../sequelize') // Your Sequelize instance

const Admin = sequelize.define('teams', {
    fullName: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    default: {
        type: DataTypes.BOOLEAN,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
})

module.exports = Admin
