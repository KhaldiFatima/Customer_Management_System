import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fatima1030',
  database: 'tg_academy_database',
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('hello');
});

app.get('/customers', (req, res) => {
  const q = 'SELECT * FROM customers';
  db.query(q, (err, data) => {
    if (err) return res.json(`Error : ${err.message}`);
    return res.json(data);
  });
});

app.post('/customers', (req, res) => {
  const q =
    'INSERT INTO customers (`first_name`, `last_name`, `email`, `mobile`, `status`, `gender`) VALUES (?)';
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.mobile,
    req.body.status,
    req.body.gender,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(`Error : ${err.message}`);
    return res.json(data);
  });
});

app.delete('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  const q = 'DELETE FROM customers WHERE id = ? ';
  db.query(q, [customerId], (err, data) => {
    if (err) return res.json(`Error : ${err.message}`);
    return res.json(data);
  });
});

app.put('/customers/:id', (req, res) => {
  const customerId = req.params.id;
  const q =
    'UPDATE customers SET `first_name`=?, `last_name`= ?, `email`= ? , `mobile`= ? , `status`= ? , `gender`= ? WHERE id = ? ';

  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.mobile,
    req.body.status,
    req.body.gender,
  ];

  db.query(q, [...values, customerId], (err, data) => {
    if (err) return res.json(`Error : ${err.message}`);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log('Connected to server!');
});
