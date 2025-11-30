import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Farhad2011!',
  database: 'eco_platform'
});

db.connect(err => {
  if (err) return console.error('DB error:', err);
  console.log('MySQL connected');
});

// REGISTER ROUTE
app.post('/api/register', (req, res) => {
  console.log('Request body:', req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.query(sql, [name, email, password], (err) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ success: false, message: 'DB error' });
    }

    res.json({ success: true, message: 'User registered!' });
  });
});
app.listen(5000, () => console.log('API running on http://localhost:5000'));
