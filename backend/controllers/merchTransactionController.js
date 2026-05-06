//const {pgQuery: db_pg, ormQuery: db_orm} = require('../config/db') only the function pgQuery is attached to the db_pg so just db_pg(queryText)
const db = require("../config/db") // db will contain all the methods from the module, and you can directly use db.pgQuery() to call the function.
const TransactionModel = require('../models/transactionModel')

const MerchTransactionController = {
    getAllMerchTransactionsPg : async(req, res) => {
        try {
            const {merchant_id} = req.body
            
            const queryText = `
                SELECT t.*, c.cust_name 
                FROM transactions t 
                JOIN customer c ON t.cust_id = c.cust_id 
                WHERE t.merchant_id = $1;
            `;
            
            const {rows} = await db.pgQuery(queryText, [merchant_id])

            res.status(200).json({
                message : `All Transactions of Merchant ${merchant_id} Shown Using PG`,
                allMerchTransactions : rows
            })
        } catch (error) {
            console.log("fail to get data")
            res.status(404).json ({
                message : "No Transactions Found using PG - getAllMerchTransactionsPg"
            })
            
        }
    },

    getAllMerchTransactionsORM : async(req, res) => {
        try{
            const {merchant_id} = req.body
            const allTransactions = await TransactionModel.findAll({
                where : {merchant_id : merchant_id}
            }
            );
            res.status(200).json({
                message : "All Transactions Shown Using ORM",
                allMerchTransactions : allTransactions
            })
        } catch(error) {
            console.log("Fall into here")
            res.status(404).json ({
                message : "No Transactions Found using ORM"
            })
        }
    },

    getSingleMerchTransactionsPg : async(req, res) => {
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

    getSingleMerchTransactionsORM : async(req, res) => {
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
    createNewMerchTransactionsPg : async(req, res) =>  {
        try {
            const { cust_id, merchant_id, pdt_qty, amt, pay_method} = req.body

            const lastMerchTxnIdQuery = (await db.pgQuery("SELECT MAX(merchant_txn_id) from transactions WHERE merchant_id = $1",[merchant_id]))
            const lastMerchTxnId = lastMerchTxnIdQuery.rows[0].max
           
            console.log("Last Number :", lastMerchTxnId)

            const merchant_txn_id = lastMerchTxnId ? lastMerchTxnId + 1 : 1;

            console.log(merchant_txn_id)

            
            const queryText = 'INSERT INTO transactions (merchant_txn_id, cust_id, merchant_id, pdt_qty, amt, pay_method) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
            
            const values = [merchant_txn_id, cust_id, merchant_id, pdt_qty, amt, pay_method]
            
            const {rows} = await db.pgQuery(queryText, values)
            
            res.status(201).json ({
                 message : "Transaction has been added Using PG.",
                 newTransaction : rows[0]
            })

        }catch(error) {
            res.status(400).json ({
                message : "Transaction failed to be added Using PG.",
                error: error.message
            })
        }
    },

    createNewMerchTransactionsORM : async(req, res) => {
        try{

            const { cust_id, merchant_id, pdt_qty, amt, pay_method} = req.body

            const lastMerchTxnIdQuery = (await db.pgQuery("SELECT MAX(merchant_txn_id) from transactions WHERE merchant_id = $1",[merchant_id]))
            const lastMerchTxnId = lastMerchTxnIdQuery.rows[0].max
           
            console.log("Last Number :", lastMerchTxnId)

            const merchant_txn_id = lastMerchTxnId ? lastMerchTxnId + 1 : 1;

            console.log(merchant_txn_id)
            
            const newTransaction = await TransactionModel.create({
                merchant_txn_id : merchant_txn_id,
                cust_id : cust_id,
                merchant_id : merchant_id,
                pdt_qty : pdt_qty,
                amt : amt,
                pay_method : pay_method
            })

            res.status(201).json({
                message : "Transaction added successfully Using ORM",
                transactionCreated : newTransaction
            })

        }catch(error) {
            res.status(400).json ({
                message : "Transaction failed to be added Using ORM.",
                error: error.message
            })
        }
    },

    updateTransactionStatusPg : async(req,res) => {
        try{
            const {merchant_id, merchant_txn_id, txn_status} = req.body
            
            const values = [merchant_id, merchant_txn_id, txn_status]

            const queryText = `UPDATE transactions 
                SET txn_status = $3,
                cancelref_date = NOW()
                WHERE merchant_id = $1 AND merchant_txn_id = $2 
                RETURNING *
            `
            
            const {rows} = await db.pgQuery(queryText, values)

            res.status(200).json({
                message: `Transaction ${merchant_txn_id} for Merchant ${merchant_id} updated successfully`,
                updatedTransaction: rows[0]
            });

        } catch (error) {
            res.status(400).json ({
                message : `Transaction Status for Merchant ${merchant_id} at Transaction ${merchant_txn_id} failed to update.`,
                error : error.message
            })
        }
        
        
    },

    getDailyRevenueByMerchantPg : async(req,res) => {
        try{
           const { merchant_id } = req.body; // this line is needed

            const queryText = `
                SELECT 
                    TO_CHAR(date AT TIME ZONE 'Asia/Singapore', 'YYYY-MM-DD') AS revenue_date,
                    SUM(amt) AS daily_revenue,
                    COUNT(*) AS daily_orders
                FROM transactions
                WHERE merchant_id = $1
                    AND txn_status = 'Completed'
                GROUP BY TO_CHAR(date AT TIME ZONE 'Asia/Singapore', 'YYYY-MM-DD')
                ORDER BY revenue_date DESC
            `;


            const { rows } = await db.pgQuery(queryText, [merchant_id]);

            res.status(200).json({
                message: `Daily revenue for merchant ${merchant_id} retrieved successfully using PG.`,
                dailyRevenue: rows,
            });

        } catch (error) {
            res.status(404).json ({
                message : `Failed to retrieve daily revenue data for Merchant ${merchant_id} using PG.`,
                error: error.message,
            })
        }
    }

    
}

module.exports = MerchTransactionController