// server.js
// 🌟 Welcome to the Inventory Management Backend! This Express.js server powers our app with secure APIs.
// 🎨 Setting up the foundation with essential dependencies for a robust server.
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const app = express();

// 🌸 Enabling CORS and JSON parsing for smooth client-server communication.
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// 💎 Database Connection - A sparkling link to our MySQL inventory database.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'inventory_db',
    port: 3306
});

// 🔐 JWT Secret - A guarded treasure to sign and verify our tokens.
const JWT_SECRET = 'your_jwt_secret';

// 🛡️ Authentication Middleware - A majestic gatekeeper for protected routes.
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401); // 🚫 No token? Access denied!
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // ❌ Invalid token? Forbidden!
        req.user = user;
        next(); // ✅ All clear, proceed!
    });
};

// 🌿 User Registration - A blooming process to welcome new users securely.
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if username or email already exists
    db.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length > 0) {
            // Check which field is duplicated
            const duplicate = results[0].email === email ? 'Email' : 'Username';
            return res.status(409).json({ error: `${duplicate} already exists` });
        }
        // Insert new user
        db.query('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword], (err) => {
                if (err) return res.status(500).json({ error: 'Registration failed' });
                res.status(201).json({ message: 'User registered' });
            });
    });
});

// 🌹 User Login - A graceful dance to authenticate users with a token reward.
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
        const user = results[0];
        const isValid = await bcrypt.compare(password, user.password); // 🔍 Verify password.
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' }); // 🎁 Issue token.
        res.json({ token });
    });
});

// 📚 Article Listing - A beautifully paginated gallery of articles with search magic.
app.get('/articles', authenticateToken, (req, res) => {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;
    const searchQuery = `%${search}%`;

    // First, get the total count
    db.query(
        'SELECT COUNT(*) AS total FROM Articles WHERE name LIKE ?',
        [searchQuery],
        (err, countResults) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            const total = countResults[0].total;

            // Then, get the paginated articles
            db.query(
                'SELECT * FROM Articles WHERE name LIKE ? LIMIT ? OFFSET ?',
                [searchQuery, parseInt(limit), offset],
                (err, results) => {
                    if (err) return res.status(500).json({ error: 'Database error' });
                    res.json({ articles: results, total }); // Return both!
                }
            );
        }
    );
});

// 🛒 Take Out Article - A smooth process to update stock and log the action.
app.post('/articles/take-out', authenticateToken, (req, res) => {
    const { articleId } = req.body;
    const userId = req.user.id;
    db.query('UPDATE Articles SET stock_status = "out" WHERE id = ? AND stock_status = "in"', [articleId], (err, result) => {
        if (err || result.affectedRows === 0) return res.status(400).json({ error: 'Article not available' });
        db.query('INSERT INTO Article_Out (article_id, user_id) VALUES (?, ?)', [articleId, userId], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to log action' });
            res.json({ message: 'Article taken out' }); // 🎵 Action logged!
        });
    });
});

// REMOVE or COMMENT OUT this block during development!
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

// 🚀 Launch the Server - Let the inventory magic begin on port 3000.
app.listen(3000, () => console.log('Server running on port 3000'));