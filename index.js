const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'articles_db'
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// POST: Create an article
app.post('/articles', (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO articles (title, content) VALUES (?, ?)';
    db.query(sql, [title, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, title, content });
    });
});

// GET: Retrieve all articles
app.get('/articles', (req, res) => {
    db.query('SELECT * FROM articles', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET: Retrieve a single article
app.get('/articles/:id', (req, res) => {
    const sql = 'SELECT * FROM articles WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Article not found' });
        res.json(results[0]);
    });
});

// PUT: Update an article
app.put('/articles/:id', (req, res) => {
    const { title, content } = req.body;
    const sql = 'UPDATE articles SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Article not found' });
        res.json({ id: req.params.id, title, content });
    });
});

// DELETE: Delete an article
app.delete('/articles/:id', (req, res) => {
    const sql = 'DELETE FROM articles WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Article not found' });
        res.status(204).send();
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
