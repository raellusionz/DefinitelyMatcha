require('dotenv').config();
//ORM CRUD
const { Sequelize } = require('sequelize');
//RAW CRUD
const { Pool } = require('pg');

const sequelize = new Sequelize(
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_DATABASE,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port : process.env.DB_PORT,
        ssl : {
            rejectUnauthorized : false
        }
    }
)

//Raw CRUD
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    }
});


sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    sequelize.sync()
        .then(() => {
            console.log('Database Synced');
        })
        .catch((err) => console.error('Error syncing the database:', err));
        process.exit(1);  // Exit if syncing fails
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);  // Exit if syncing fails
  });


pool.on('connect', () => {
    console.log('Database connected successfully');
});

pool.on('error', (err) => {
    console.error('Error connecting to the database', err.stack);
    process.exit(1);
});

const query = async (text, params) => {
    const client = await pool.connect();
    try {
        return await client.query(text, params);
    } finally {
        client.release();
    }
};

module.exports = { query };