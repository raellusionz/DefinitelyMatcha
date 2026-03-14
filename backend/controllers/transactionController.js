//const {pgQuery: db_pg, ormQuery: db_orm} = require('../config/db') only the function pgQuery is attached to the db_pg so just db_pg(queryText)
const db = require("../config/db") // db will contain all the methods from the module, and you can directly use db.pgQuery() to call the function.
const TransactionModel = require('../models/transactionModel')

const TransactionController = {
    getAllTransactionsPg : async(req, res) => {
        try {
            const queryText = 'Select * from transactions'
            const {rows} = await db.pgQuery(queryText)

            res.status(200).json({
                message : "All Transactions Shown Using PG",
                allTransactions : rows
            })
        } catch (error) {
            console.log("fail to get data")
            res.status(404).json ({
                message : "No Transactions Found Using PG",
                error: error.message
            })
            
        }
    },

    getAllTransactionsORM : async(req, res) => {
        try{
            const allTransactions = await TransactionModel.findAll();
            res.status(200).json({
                message : "All Transactions Shown Using ORM",
                allTransactions : allTransactions
            })
        } catch(error) {
            console.log("Fall into here")
            res.status(404).json ({
                message : "No Transactions Found Using ORM",
                error: error.message
            })
        }
    },

    getSingleTransactionsByIdPG : async(req,res) => {
        try{
            const {txn_id} = req.params
            
            const queryText = 'Select * FROM transactions where global_txn_id = $1'
            
            const {rows} = await db.pgQuery(queryText,[txn_id])
            
            res.status(200).json({
                message : `Transaction ${txn_id} is displayed Using PG`,
                oneTransaction : rows[0]
            })
        } catch(error){
            res.status(404).json({
                message : `Transaction ${txn_id} cannot be found Using PG`,
                error: error.message
            })
        }
    },

    getSingleTransactionsByIdORM : async(req,res) => {
        try{
            const {txn_id} = req.params
            
            const singleTransaction = await TransactionModel.findOne({
                where : {global_txn_id : txn_id}   
            })
            
            res.status(200).json({
                message : `Transaction ${txn_id} is displayed using ORM.`,
                oneTransaction : singleTransaction
            })
          
        } catch(error){
            res.status(404).json({
                message : `Transaction ${txn_id} cannot be found using ORM.`,
                error: error.message
            })
        }
    },

    

    createNewTransactionsPg : async(req, res) =>  {
        try {
            const {merchant_txn_id, cust_id, merchant_id, pdt_qty, amt, pay_method} = req.body
            
            const queryText = 'INSERT INTO transactions (merchant_txn_id, cust_id, merchant_id, pdt_qty, amt, pay_method) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
            
            const values = [merchant_txn_id, cust_id, merchant_id,pdt_qty, amt, pay_method]
            
            const {rows} = await db.pgQuery(queryText, values)
            
            res.status(201).json ({
                message : "Transaction has been added Using PG.",
                newTransaction : rows[0]
            })

        }catch(error) {
            res.status(404).json ({
                message : "Transaction failed to be added Using PG.",
                error: error.message
            })
        }
    },

    createNewTransactionsORM : async(req, res) => {
        try{
            const {merchant_txn_id, cust_id, merchant_id, pdt_qty, amt, pay_method} = req.body
            
            const newTransaction = await TransactionModel.create({
                merchant_txn_id : merchant_txn_id,
                cust_id : cust_id,
                merchant_id : merchant_id,
                pdt_qty : pdt_qty,
                amt : amt,
                pay_method : pay_method
            })

            res.status(200).json({
                message : "Transaction added successfully Using ORM",
                transactionCreated : newTransaction
            })

        }catch(error) {
            res.status(404).json ({
                message : "Transaction failed to be added Using ORM.",
                error: error.message
            })
        }
    },

    deleteTransactionByIdPg : async(req, res) => {
        try {
            const {txn_id} = req.params

            const queryText = 'DELETE FROM transactions WHERE global_txn_id = $1'

            const rows = await db.pgQuery(queryText, [txn_id])

            res.status(200).json ({
                message : `Transaction ${txn_id} has been deleted using PG.`
            })

        } catch (error) {

            console.error("Error deleting transaction from PostgreSQL:", error);
            res.status(500).json({
                message: "An error occurred while deleting the transaction using PG.",
                error: error.message
            })
        }
    },

    deleteTransactionByIdORM : async (req, res) => {
        try {
            const {txn_id} = req.params
            
            const deleteTransaction = await TransactionModel.destroy({
                where : {global_txn_id : txn_id}   
            })

            res.status(200).json ({
                message : `Transaction ${txn_id} has been deleted using ORM.`
            })

        } catch(error){
            console.error("Error deleting transaction from PostgreSQL:", error);
            res.status(500).json({
                message: "An error occurred while deleting the transaction using ORM.",
                error: error.message
            })
        }
    }
}

module.exports = TransactionController



// //const Transaction = require('./models/transactionModel');

// // To create a new transaction
// Transaction.create({
//   pdt_qty: 10,
//   amt: 50.00,
//   date: new Date(),
//   pay_method: 'Credit Card',
// });

// // To fetch transactions
// const transactions = await Transaction.findAll();