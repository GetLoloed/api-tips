const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    modified_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    },
    firstname: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    active: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
