// Import the database module (assuming you have pgQuery function to interact with your database)
const db = require("../config/db");  // db will contain all methods like pgQuery()

const cartController = {
  // Fetch the user's cart based on the customer ID
  getUserCartPg: async (req, res) => {
    try {

    const { cust_id } = req.body;

    // Updated query to include merchant_id
      const queryText = `
        SELECT merchant_id, merchant_pdt_id, pdt_name, pdt_price, COUNT(*)::int as qty
        FROM cart 
        WHERE cust_id = $1
        GROUP BY merchant_id, merchant_pdt_id, pdt_name, pdt_price
      `;
    
    const { rows } = await db.pgQuery(queryText, [cust_id]);

    res.status(200).json({
      message: `Cart items for customer ${cust_id}`,
      singleUserCart: rows,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart data",
      error: error.message,
    });
  }
  },

  // Reset the user's cart (still needs implementation)
  resetUserCartPg: async (req, res) => {
    try {
      const { cust_id } = req.body;

      // Logic to reset the cart for the given customer ID
      const queryText = 'DELETE FROM cart WHERE cust_id = $1';
      const result = await db.pgQuery(queryText, [cust_id]);

      // Send a success response after resetting the cart
      res.status(200).json({
        message: `Cart for customer ${cust_id} has been reset`,
      });

    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error resetting user cart:", error);

      // Send a generic error message to the client
      return res.status(500).json({
        message: "Failed to reset cart data",
        error: error.message,
      });
    }
  },
 
  addItemToCartPg : async(req,res) => {
    try {
        const {cust_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price} = req.body

        const queryText = 'INSERT INTO cart (cust_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price) VALUES ($1, $2, $3, $4, $5) RETURNING * '
        const values = [cust_id, merchant_id, merchant_pdt_id, pdt_name, pdt_price]

        const {rows} = await db.pgQuery(queryText, values)
        
        res.status(201).json ({
            message : "Order Items has been added Using PG.",
            newCartItem : rows[0]
        })

    } catch(error) {
        res.status(404).json ({
            message : "Items failed to be added into Order Table Using PG.",
            error: error.message
        })
    }
  },

  reduceQuantityCartPg: async (req, res) => {
    try {
        const { cust_id, merchant_id, merchant_pdt_id } = req.body;

        // Query to delete the latest cart item based on the highest cart_item_id
        const queryText = `
          DELETE FROM cart
          WHERE cart_item_id = (
            SELECT cart_item_id 
            FROM cart
            WHERE cust_id = $1 
              AND merchant_id = $2 
              AND merchant_pdt_id = $3
            ORDER BY cart_item_id DESC
            LIMIT 1
          )
          RETURNING *;
        `;
        
        const values = [cust_id, merchant_id, merchant_pdt_id];

        const { rows } = await db.pgQuery(queryText, values);

        res.status(200).json({
            message: "Latest item has been deleted from the cart."
        });
            
        } catch (error) {
            res.status(404).json({
                message: "Failed to delete the latest item from the cart.",
                error: error.message
            });
        }
    },

    removeCartItemPg : async(req,res) => {
      try{ 

        const {cust_id, merchant_id, merchant_pdt_id} = req.body
        
       
        const queryText = 'DELETE FROM cart WHERE cust_id = $1 AND merchant_id = $2 AND merchant_pdt_id = $3';  
        
        const values = [cust_id, merchant_id, merchant_pdt_id]

        const {rows} = await db.pgQuery(queryText, values)
        
        res.status(200).json ({
          message: "Item has been removed from the cart."
        })

      } catch (error) {
            res.status(404).json({
                message: "Failed to delete the latest item from the cart.",
                error: error.message
            });
        }

    }

};

// Export the controller for use in the routes
module.exports = cartController; 