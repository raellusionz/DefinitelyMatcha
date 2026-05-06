//const {pgQuery: db_pg, ormQuery: db_orm} = require('../config/db') only the function pgQuery is attached to the db_pg so just db_pg(queryText)
const db = require("../config/db") // db will contain all the methods from the module, and you can directly use db.pgQuery() to call the function.
const ProductModel = require('../models/productModel')

const ProductController = {
    getAllProductsPg : async (req, res) => {
        try {
            const queryText = 'SELECT * FROM products'

            const {rows} = await db.pgQuery(queryText) 

            res.status(200).json({
                message : "All Products from All Merchants are Displayed using PG",
                allProducts : rows
            })
        } catch(error) {
            res.status(404).json ({
                message : "No Products Found",
                error : error.message
            })
        }
    },

    getAllProductsORM : async(req,res) => {
        try {
            const allProducts = await ProductModel.findAll()
            res.status(200).json ({
                message : "All Products from All Merchants are Displayed using ORM",
                allProducts : allProducts
            })
        } catch (error) {
            res.status(404).json ({
                message : "No Products Found",
                error : error.message
            })
        }
    },

    getSingleMerchantProductsPg : async (req, res) => {
        try{
            const {merchant_id} = req.body
            const queryText = 'SELECT * from products where merchant_id = $1'
            const {rows} = await db.pgQuery(queryText, [merchant_id])
            res.status(200).json({
                message : `All Products from Merchant ${merchant_id} are Displayed using PG`,
                singleMerchantProducts : rows

            })

        } catch(error) {
            res.status(404).json({
                message : `Merchant ${merchant_id} does not exist`,
                
            })
        }
    },

    getSingleMerchantProductsORM : async (req, res) => {
        try{
            const {merchant_id} = req.body

            const singleMerchantProducts = await ProductModel.findAll({
                 where : {
                    merchant_id : merchant_id
                }
            })
           
            res.status(200).json({
                message : `All Products from Merchant ${merchant_id} are Displayed using ORM`,
                singleMerchantProducts : singleMerchantProducts

            })

        } catch(error) {
            res.status(404).json({
                message : `Merchant ${merchant_id} does not exist`,
                error: error.message
            })
        }
    },

    addSingleProductMerchantPg : async(req, res) => {
        try {
            const {merchant_id, pdt_category, pdt_name, pdt_price, pdt_desc} = req.body
            const lastMerchPdtIdQuery = await (db.pgQuery("SELECT MAX(merchant_pdt_id) from products where merchant_id = $1", [merchant_id])) 

            const lastMerchPdtId = lastMerchPdtIdQuery.rows[0].max

             console.log("Last Product Number :", lastMerchPdtId)

            const merchant_pdt_id = lastMerchPdtId ? lastMerchPdtId + 1 : 1;

            console.log(merchant_pdt_id)

            const values = [merchant_id, merchant_pdt_id, pdt_category, pdt_name, pdt_price, pdt_desc]

            console.log(merchant_id)

            const queryText = "INSERT INTO products (merchant_id, merchant_pdt_id, pdt_category, pdt_name, pdt_price, pdt_desc) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"

            const {rows} = await db.pgQuery(queryText, values)

            res.status(201).json ({
                message : {
                    message : `Item has been added for ${merchant_id} Using PG.`,
                    newProduct : rows[0]
                }
            })
        } catch(error) {
            res.status(400).json({
                message : `Item cannot be added.`,
                error: error.message
            })
        }
    },

    addSingleProductMerchantORM : async(req,res) => {
        try {
            const {merchant_id, pdt_category, pdt_name, pdt_price, pdt_desc} = req.body
            const lastMerchPdtIdQuery = await (db.pgQuery("SELECT MAX(merchant_pdt_id) from products where merchant_id = $1", [merchant_id])) 

            const lastMerchPdtId = lastMerchPdtIdQuery.rows[0].max

             console.log("Last Product Number :", lastMerchPdtId)

            const merchant_pdt_id = lastMerchPdtId ? lastMerchPdtId + 1 : 1;

            console.log(merchant_pdt_id)

            const newProduct = await ProductModel.create({
                merchant_id :merchant_id,
                merchant_pdt_id : merchant_pdt_id,
                pdt_category : pdt_category, 
                pdt_name : pdt_name ,
                pdt_price : pdt_price,
                pdt_desc : pdt_desc
            })
            
            res.status(201).json ({
                message : {
                    message : `Item has been added for ${merchant_id} Using PG.`,
                    newProduct : newProduct
                }
            })
            
        }catch(error) {
            res.status(400).json({
                message : `Item cannot be added.`,
                error: error.message
            })
        }
    },

    deleteSingleProductMerchantPg : async(req,res) => {
        try{
            const {merchant_id, merchant_pdt_id} = req.body

            const queryText = 'DELETE from products WHERE merchant_id = $1 AND merchant_pdt_id = $2'
            const values = [merchant_id, merchant_pdt_id]

            const {rows} = await db.pgQuery(queryText,values)

            res.status(200).json ({
                message : `Item ${merchant_pdt_id} of Merchant ${merchant_id} has been deleted using Pg.`
            })
        }catch(error){
            console.error("Error deleting transaction from PostgreSQL:", error);
            res.status(500).json({
                message: "An error occurred while deleting the transaction using PG.",
                error: error.message
            })
        }
    },

    deleteSingleProductMerchantORM: async(req,res) => {
        try{
            const {merchant_id, merchant_pdt_id} = req.body
            const deleteProduct = await ProductModel.destroy({
                where : {
                    merchant_id : merchant_id,
                    merchant_pdt_id : merchant_pdt_id
                }
            })

            res.status(200).json ({
                message : `Item ${merchant_pdt_id} of Merchant ${merchant_id} has been deleted using ORM.`
            })
            
       }catch(error){
            console.error("Error deleting transaction from PostgreSQL:", error);
            res.status(500).json({
                message: "An error occurred while deleting the transaction using PG.",
                error: error.message
            })
        }
    },

    updateSingleProductMerchantPg : async(req,res) => {
        try {
            const {merchant_id, merchant_pdt_id, pdt_category, pdt_name, pdt_price, pdt_desc} = req.body

            const queryText = `
                UPDATE products
                SET 
                    pdt_category = $1,
                    pdt_name = $2,
                    pdt_price = $3,
                    pdt_desc = $4
                WHERE merchant_id = $5
                AND merchant_pdt_id = $6
                RETURNING *;
            `;

           const values = [pdt_category, pdt_name, pdt_price, pdt_desc, merchant_id, merchant_pdt_id];
            
            const {rows} = await db.pgQuery(queryText, values)

            res.status(200).json ({
                message : {
                    message : `Item has been updated for ${merchant_id} Using PG.`,
                    updatedProduct : rows[0]
                }
            })


        } catch (error) {
            res.status(500).json({
                error : "Failed to update product"
            })
        }
    }
}

module.exports = ProductController