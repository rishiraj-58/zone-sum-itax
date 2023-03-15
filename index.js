const express = require('express');
const mysql = require('mysql');

// create connection pool to the MySQL database
const pool = mysql.createConnection({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zone_c_plans',
  port: 3307
});

pool.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database: ' + err.message);
        return;
      }
      console.log('Connected to MySQL database!');
})

// create an express app
const app = express();
app.use(express.json());

// create an API endpoint to insert a plan
app.post('/plans', (req, res) => {
  const { plan_type, age_band, lakh_5, lakh_10, lakh_15, lakh_20, lakh_25, lakh_50, lakh_75, cr_1, cr_2 } = req.body;

  // insert a new plan into the plans table
  pool.query('INSERT INTO plans (plan_type, age_band, lakh_5, lakh_10, lakh_15, lakh_20, lakh_25, lakh_50, lakh_75, cr_1, cr_2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [plan_type, age_band, lakh_5, lakh_10, lakh_15, lakh_20, lakh_25, lakh_50, lakh_75, cr_1, cr_2], (error, results, fields) => {
    if (error) {
      throw error;
    }

    // send a success message as a response
    res.send('Plan created successfully');
  });
});

// create an API endpoint to retrieve all plans
app.get('/plans', (req, res) => {
  // select all plans from the plans table
  pool.query('SELECT * FROM plans', (error, results, fields) => {
    if (error) {
      throw error;
    }

    // send the data as a JSON response
    res.json(results);
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
