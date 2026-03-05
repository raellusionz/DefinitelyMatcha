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
                allTransactionsPg : rows
            })
        } catch (error) {
            console.log("fail to get data")
            res.status(404).json ({
                message : "No Transactions Found using PG"
            })
            
        }
    },

    getAllTransactionsORM : async(req, res) => {
        try{
            const transactions = await TransactionModel.findAll();

            res.status(200).json({
                allTransactionsORM : transactions
            })
        } catch(error) {
            res.status(404).json ({
                message : "No Transactions Found using ORM"
            })
        }
    },

    createNewTransactionsORM : async(req, res) => {
        try{
            const {pdt_qty, amt, pay_method} = req.body
            const newTransaction = await TransactionModel.create({
                pdt_qty : pdt_qty,
                amt : amt,
                pay_method : pay_method
            })

            res.status(200).json({
                message : "Transaction added successfully.",
                transactionCreated : newTransaction
            })
        }catch(error) {
            res.status(404).json ({
                message : "Transaction failed to be added."
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