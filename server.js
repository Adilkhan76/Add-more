const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'storage'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Route to handle form submission
app.post('/save', (req, res) => {
  const fields = req.body.fields; // Array of input values
  const combinedFields = fields.join(', '); // Combine into a single string

  const sql = 'INSERT INTO Person (P_name) VALUES (?)';
  db.query(sql, [combinedFields], (err, result) => {
    if (err) throw err;
    console.log('Data saved:', result);
    res.send('Data Saved Successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});






