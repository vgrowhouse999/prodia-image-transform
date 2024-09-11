const { Client } = require('pg');
require('dotenv').config(); // Load environment variables from .env

// Use the DATABASE_URL from the environment variables
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for cloud-hosted databases
  }
});

// Connect to the database
client.connect();

// Test the connection
client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected:', res.rows);
  }
  client.end();
});
