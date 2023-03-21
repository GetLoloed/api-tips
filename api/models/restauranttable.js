const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const RestaurantTable = sequelize.define('RestaurantTable', {
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
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'restauranttable',
    timestamps: false
});

module.exports = RestaurantTable;
