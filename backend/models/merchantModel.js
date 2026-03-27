const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');  

const MerchantModel = sequelize.define('MerchantModel',{
    merchant_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    merchant_login : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    merchant_pass : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    merchant_brand_name : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    active_status : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
    }

}, {
    tableName : 'merchant',
    timestamps : false

});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Merchant model has been synced'))
  .catch((err) => console.error('Error syncing the Merchant model:', err));

module.exports = MerchantModel;