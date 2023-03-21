const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./users');
const Service = require('./services');

const ServiceUser = sequelize.define('ServiceUser', {
    id_service: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Service,
            key: 'id'
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'serviceusers',
    timestamps: false,
    primaryKey: false
});

ServiceUser.belongsTo(Service, {foreignKey: 'id_service'});
ServiceUser.belongsTo(User, {foreignKey: 'id_user'});

module.exports = ServiceUser;
