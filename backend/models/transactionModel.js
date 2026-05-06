const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');  

const TransactionModel  = sequelize.define('TransactionModel',{
    global_txn_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    merchant_txn_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    cust_id  : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    merchant_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    pdt_qty : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    amt : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false
    },
    date : {
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: Sequelize.NOW,
    },
    pay_method : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    txn_status : {
        type : DataTypes.STRING(20),
        defaultValue : 'Completed',
        allowNull : false
    },
    
    cancelref_date : {
        type : DataTypes.DATE,
        allowNull : true
    }

}, {
    tableName : 'transactions',
    timestamps : false
});


// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Transaction model has been synced'))
  .catch((err) => console.error('Error syncing the Transaction model:', err));

module.exports = TransactionModel;