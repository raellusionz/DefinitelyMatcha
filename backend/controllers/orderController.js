const db = require("../config/db") // db will contain all the methods from the module, and you can directly use db.pgQuery() to call the function.
const OrderModel = require('../models/orderModel')

const OrderController = {
    getAllOrdersPg : async(req, res) => {
        try {
            const queryText = 'SELECT * FROM orders'
            
            const {rows} = await db.pgQuery(queryText)

            res.status(200).json({
                message : "All Orders Shown using PG",
                allOrders : rows
            })
        } catch(error) {
            res.status(404).json({
                message : "No Orders Found Using PG",
                error : error.message
            })
        }
    },

    getAllOrdersORM : async(req , res) => {
        try {
            const allOrders = await OrderModel.findAll()
            res.status(200).json({
                message : "All Orders Shown using ORM",
                allOrders : allOrders
            })
        } catch(error) {
            res.status(404).json({
                message : "No Orders Found Using ORM",
                error : error.message
            })
        }
    },

    getSingleOrderItemsPg : async(req, res) => {
        try {
            const {merchant_id, merchant_txn_id } = req.body 

            const queryText = 'SELECT * FROM orders where merchant_id = $1 AND merchant_txn_id = $2'

            const values = [merchant_id, merchant_txn_id]

            const {rows} = await db.pgQuery(queryText, values)

            res.status(200).json ({
                message : `Order Items of ${merchant_id} of Transaction Number : ${merchant_txn_id}`,
                singleOrderItems : rows
            })
        } catch (error) {
            res.status(404).json({
                message : `Order Items of ${merchant_id} of Transaction Number : ${merchant_txn_id} Not Found.`
            })
        }
    },

    getSingleOrderItemsORM : async (req, res) => {
        try {
            const {merchant_id, merchant_txn_id } = req.body 

            const singleOrderItems = await OrderModel.findAll({
                where : {
                    merchant_id : merchant_id,
                    merchant_txn_id : merchant_txn_id
                }
            })

            res.status(200).json({
                message : `Order Items of ${merchant_id} of Transaction Number : ${merchant_txn_id}`,
                singleOrderItems : singleOrderItems
            })
        } catch(error){
            res.status(404).json({
                message : `Order Items of ${merchant_id} of Transaction Number : ${merchant_txn_id} Not Found.`
            })
        }
    },
    
    // For loop every item in
    createSingleOrderItemsPg : async (req, res) => {
        try{
            const {merchant_txn_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price} = req.body

            const values = [merchant_txn_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price]

            const queryText = 'INSERT INTO orders (merchant_txn_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price) VALUES ($1,$2, $3, $4, $5) RETURNING *'
            
            const {rows} = await db.pgQuery(queryText ,values)

            res.status(201).json ({
                message : "Order Items has been added Using PG.",
                newTransaction : rows[0]
            })

        }catch(error) {
            res.status(404).json ({
                message : "Items failed to be added into Order Table Using PG.",
                error: error.message
            })

        }
    },

    // For loop every item in
    createSingleOrderItemsORM : async (req, res) => {
        try{
            const {merchant_txn_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price} = req.body

            const newOrder = await OrderModel.create({
                merchant_txn_id : merchant_txn_id, 
                merchant_id : merchant_id, 
                merchant_pdt_id : merchant_pdt_id, 
                pdt_name : pdt_name, 
                pdt_price : pdt_price
            })

            res.status(201).json ({
                message : "Order Items has been added Using ORM.",
                newOrder : newOrder
            })
            
        } catch(error) {
            res.status(404).json ({
                message : "Items failed to be added into Order Table Using PG.",
                error: error.message
            })

        }
    }
}

module.exports = OrderController