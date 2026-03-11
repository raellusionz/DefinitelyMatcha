//const {pgQuery: db_pg, ormQuery: db_orm} = require('../config/db') only the function pgQuery is attached to the db_pg so just db_pg(queryText)
const db = require("../config/db") // db will contain all the methods from the module, and you can directly use db.pgQuery() to call the function.
const TransactionModel = require('../models/transactionModel')

const CustTransactionController = {

    getAllCustTransactionsPg : async(req, res) => {
        try {
            const {cust_id} = req.body
            
            const queryText = 'SELECT * from transactions WHERE cust_id = $1'
         
            const {rows} = await db.pgQuery(queryText, [cust_id])

            res.status(200).json({
                message : `All Transactions of Customer ${cust_id} Shown Using PG`,
                allCustTransactions : rows
            })
        } catch (error) {
            console.log("fail to get data")
            res.status(404).json ({
                message : "No Transactions Found using PG - getAllMerchTransactionsPg",
                error: error.message
            })
            
        }
    },

    getAllCustTransactionsORM : async(req, res) => {
        try{
            const {cust_id} = req.body
            const allTransactions = await TransactionModel.findAll({
                where : {cust_id : cust_id}
            }
            );
            res.status(200).json({
                message : "All Transactions Shown Using ORM",
                allCustTransactions : allTransactions
            })
        } catch(error) {
            console.log("Fall into here")
            res.status(404).json ({
                message : "No Transactions Found using ORM",
                error: error.message
            })
        }
    },
    getSingleCustTransactionsPg : async(req, res) => {
        try {
            const {merchant_id, merchant_txn_id } = req.body

            const queryText = 'SELECT * from transactions WHERE merchant_id = $1 AND merchant_txn_id = $2'
            
            const values = [merchant_id, merchant_txn_id]

            const {rows} = await db.pgQuery(queryText, values)

            res.status(200).json({
                message : `Transaction Number ${merchant_txn_id} of Merchant ${merchant_id} Shown Using PG`,
                singleMerchTransactions : rows[0]
            })
        } catch (error) {
            console.log("fail to get data")
            res.status(404).json ({
                message : "No Transactions Found using PG",
                error: error.message
            })
            
        }
    },

    getSingleCustTransactionsORM : async(req, res) => {
        try{
            const {merchant_id, merchant_txn_id } = req.body

            const allTransactions = await TransactionModel.findOne({
                where : {
                    merchant_id : merchant_id,
                    merchant_txn_id : merchant_txn_id
                }
            }
            );
            res.status(200).json({
                message : `Transaction Number ${merchant_txn_id} of Merchant ${merchant_id} Shown Using ORM`,
                singleMerchTransactions : allTransactions
            })
        } catch(error) {
            console.log("Fall into here")
            res.status(404).json ({
                message : "No Transactions Found using ORM",
                error: error.message
            })
        }
    },
}

module.exports = CustTransactionController