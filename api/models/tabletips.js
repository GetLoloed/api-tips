const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const RestaurantTable = require('./restauranttable');
const Service = require('./services');

const TableTips = sequelize.define('TableTips', {
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
    tips: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_restaurantTable: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: RestaurantTable,
            key: 'id'
        }
    },
    id_service: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Service,
            key: 'id'
        }
    }
}, {
    tableName: 'tabletips',
    timestamps: false
});

TableTips.belongsTo(RestaurantTable, {foreignKey: 'id_restaurantTable'});
TableTips.belongsTo(Service, {foreignKey: 'id_service'});

module.exports = TableTips;
