//const {pgQuery: db_pg, ormQuery: db_orm} = require('../config/db') only the function pgQuery is attached to the db_pg so just db_pg(queryText)
const db = require("../config/db") // db will contain all the methods from the module, and you can directly use db.pgQuery() to call the function.
const MerchantModel = require('../models/merchantModel')


const MerchantController = {
    // CREATE MERCHANT ACCOUNT
    createMerchant: async (req, res) => {
        try {

            const { merchant_login, merchant_pass } = req.body;

            const existingMerchant = await MerchantModel.findOne({
                where: { merchant_login }
            });

            if (existingMerchant) {
                return res.status(400).json({
                    message: "Merchant login already exists"
                });
            }

            const newMerchant = await MerchantModel.create({
                merchant_login,
                merchant_pass
            });

            res.status(201).json({
                message: "Merchant account created",
                merchant: newMerchant
            });

        } catch (error) {
            res.status(500).json({
                message: "Error creating merchant",
                error: error.message
            });
        }
    },


    // MERCHANT LOGIN
    loginMerchant: async (req, res) => {
        try {

            const { merchant_login, merchant_pass } = req.body;

            const merchant = await MerchantModel.findOne({
                where: { merchant_login }
            });

            if (!merchant) {
                return res.status(404).json({
                    message: "Merchant not found"
                });
            }

            if (merchant.merchant_pass !== merchant_pass) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            res.status(200).json({
                message: "Login successful",
                merchant_id: merchant.merchant_id,
                merchant_login: merchant.merchant_login
            });

        } catch (error) {
            res.status(500).json({
                message: "Login error",
                error: error.message
            });
        }
    },


    // LOGOUT
    logoutMerchant: async (req, res) => {
        try {

            res.status(200).json({
                message: "Merchant logged out"
            });

        } catch (error) {
            res.status(500).json({
                message: "Logout error",
                error: error.message
            });
        }
    }

};

module.exports = MerchantController;