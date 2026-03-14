const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');

const OrderModel = sequelize.define('OrderModel', {
    global_order_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    merchant_txn_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    merchant_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    merchant_pdt_id : {
        type : DataTypes.INTEGER,
         allowNull : false
    },
    pdt_name : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    pdt_price : {
        type : DataTypes.DECIMAL(10, 2),
        allowNull : false
    }
}, {
    tableName : 'orders',
    timestamps : false
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Order model has been synced'))
  .catch((err) => console.error('Error syncing the Order model:', err));

module.exports = OrderModel;