const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

const ProductModel = sequelize.define('ProductModel',{
    pdt_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    merchant_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    merchant_pdt_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    pdt_category : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    pdt_name : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    pdt_price : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false
    },
    active : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    },
},{
    tableName : 'products'
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Product model has been synced'))
  .catch((err) => console.error('Error syncing the Product model:', err));

module.exports = ProductModel;