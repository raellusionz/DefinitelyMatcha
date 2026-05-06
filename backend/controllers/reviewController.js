const db = require("../config/db")


const ReviewController = {
    getSingleCustomerReviewPg : async(req, res) => {
        try {
            const {merchant_id, merchant_txn_id} = req.body

            const queryText = `SELECT merchant_ratings from reviews 
            WHERE merchant_id = $1
            AND merchant_txn_id = $2
            `
            const values = [merchant_id, merchant_txn_id]

            const {rows} = await db.pgQuery(queryText, values)

            
            if (rows.length === 0) {
                return res.status(200).json({
                    message : `Rating of merchant_id : ${merchant_id} and merchant_txn_id : ${merchant_txn_id} is empty`,
                    hasReviewed: false,
                    rating: 0,
                });
                }

                return res.status(200).json({
                    message : `Rating of merchant_id : ${merchant_id} and merchant_txn_id : ${merchant_txn_id} is displayed`,
                    hasReviewed: true,
                    rating: rows[0].merchant_ratings,
                });

        } catch(error) {
            res.status(404).json({
                message : `Failed to retrieve customer's review at merchant_id : ${merchant_id} and merchant_txn_id : ${merchant_txn_id}`,
                error : error.message
            })
        }

    },

    newSingleCustomerReviewPg : async(req,res) => {
        try{
            const {merchant_id, merchant_txn_id, cust_id, merchant_ratings, merchant_reviews_write } = req.body
            
            const queryText = 'INSERT INTO reviews (merchant_id, merchant_txn_id, cust_id, merchant_ratings, merchant_reviews_write) VALUES ($1, $2, $3, $4, $5) RETURNING *'
            
            const values = [merchant_id, merchant_txn_id, cust_id, merchant_ratings, merchant_reviews_write]

            const {rows} = await db.pgQuery(queryText,values)

            res.status(201).json ({
                message : "A New Review has been added Using PG.",
                newTransaction : rows[0]
            })

        } catch (error) {
            res.status(400).json({
                message : "Failed to add a new review using PG",
                error: error.message
            })
        }
    }
    
}

module.exports = ReviewController