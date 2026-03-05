const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

const ProductModel = sequelize.define('ProductModel',{
    pdt_num : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    pdt_name : {
        type : DataTypes.STRING(255),
        allowNull : False
    },
    category : {
        type : DataTypes.STRING(255),
        allowNull : False
    },
    pdt_price : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : False
    },
    active : {
        type : DataTypes.,
    },
},{
    tableName : 'sale_products'
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Product model has been synced'))
  .catch((err) => console.error('Error syncing the Product model:', err));

module.exports = ProductModel;