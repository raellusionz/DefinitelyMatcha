require('dotenv').config();  // Load environment variables from .env file
//ORM CRUD
const { Sequelize } = require('sequelize');  // Import Sequelize
//RAW CRUD
const { Pool } = require('pg');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,  // Disable logging completely
  }
);

//Raw CRUD
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
   ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates (commonly used in cloud databases)
  }
});

sequelize.authenticate() // Always ensure connection is done before executing random actions.
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('ORM Unable to connect to the database:', err);
    process.exit(1);  // Exit if connection fails
  });

pool.on('connect', () => {
    console.log('Database connected successfully using PG');
});

pool.on('error', (err) => {
    console.error('Error connecting to the database using PG', err.stack);
    process.exit(1);
});

const pgQuery = async (text, params) => {
    const client = await pool.connect();
    try {
        console.log("pgQuery Connected");  // Check if connection is successful
        const result = await client.query(text, params);
        return result;  // Return query result
    } catch (error) {
        console.error('Error executing query:', error);  // Log detailed error
        throw new Error(`Failed to execute query: ${error.message}`);
    } finally {
        client.release();  // Ensure the client is released
    }
}

const ormQuery = async(text, params) => {
    try{
        const result = await sequelize.query(text,{
            replacements : params
        })
        return result
    } catch(error) {
       console.error('Error executing Sequelize query using ORM:', error);
    }
}

module.exports = { pgQuery, ormQuery, sequelize};