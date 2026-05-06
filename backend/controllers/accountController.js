//const {pgQuery: db_pg, ormQuery: db_orm} = require('../config/db') only the function pgQuery is attached to the db_pg so just db_pg(queryText)
const db = require("../config/db") // db will contain all the methods from the module, and you can directly use db.pgQuery() to call the function.


const AccountController = {
    // CREATE MERCHANT ACCOUNT
    createAccount: async (req, res) => {
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
    },

    getCustomerAccountDetails : async (req,res) => {
        try {
            
            const queryText = `
                SELECT 
                    c.cust_name,
                    c.cust_email,
                    c.cust_number,
                    u.user_name
                FROM customer c
                JOIN useraccount u
                    ON c.global_user_id = u.global_user_id
                WHERE c.cust_id = $1
            `;

            const {rows} = await db.pgQuery(queryText,[cust_id])

            if (rows.length === 0) {
                return res.status(404).json({
                    message: "Customer not found",
                });
            }

            res.status(200).json({
                message: `Data of User Found`,
                singleCustomerInfo : rows[0]
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve User Data",
                error: error.message
            });
        }
    }

};

module.exports = AccountController;