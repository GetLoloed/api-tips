const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./users');

const TipsPayment = sequelize.define('TipsPayment', {
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
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
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
    tableName: 'tipspayments',
    timestamps: false
});

TipsPayment.belongsTo(User, {foreignKey: 'id_user'});

module.exports = TipsPayment;
