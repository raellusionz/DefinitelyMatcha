const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');  

const CustomerModel = sequelize.define('CustomerModel',{
    cust_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    cust_name : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    global_user_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
}, {
    tableName : 'customer',
    timestamps : false
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Customer model has been synced'))
  .catch((err) => console.error('Error syncing the Customer model:', err));

module.exports = TransactionModel;