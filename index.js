// Import necessary modules
const express = require('express');
const { Client } = require('pg');
require('dotenv').config(); // Load environment variables

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Set up PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // This is required for most cloud-hosted Postgres databases
  }
});

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// Basic route to test the server and database connection
app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.send(`Current time from PostgreSQL: ${result.rows[0].now}`);
  } catch (error) {
    console.error('Error running query:', error);
    res.status(500).send('Error retrieving data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
