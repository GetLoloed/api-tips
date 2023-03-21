const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
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
    shiftType: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shiftClosed: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    }
}, {
    tableName: 'services',
    timestamps: false
});

module.exports = Service;
