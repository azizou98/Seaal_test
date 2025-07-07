// server.js
// 🌟 Welcome to the Inventory Management Backend! This Express.js server powers our app with secure APIs.
// 🎨 Setting up the foundation with essential dependencies for a robust server.
const express = require('express');
const { PrismaClient } = require('./generated/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const app = express();
const prisma = new PrismaClient();

// 🌸 Enabling CORS and JSON parsing for smooth client-server communication.
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

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

    try {
        const existingUser = await prisma.users.findFirst({
            where: { OR: [{ username }, { email }] }
        });

        if (existingUser) {
            const duplicate = existingUser.email === email ? 'Email' : 'Username';
            return res.status(409).json({ error: `${duplicate} already exists` });
        }

        await prisma.users.create({
            data: { username, email, password: hashedPassword }
        });

        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// 🌹 User Login - A graceful dance to authenticate users with a token reward.
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.users.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// 📚 Article Listing - A beautifully paginated gallery of articles with search magic.
app.get('/articles', authenticateToken, async (req, res) => {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;

    try {
        const where = search ? { name: { contains: search } } : {};

        const articles = await prisma.articles.findMany({
            where,
            take: parseInt(limit),
            skip: offset
        });

        const total = await prisma.articles.count({ where });

        res.json({ articles, total });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// 🛒 Take Out Article - A smooth process to update stock and log the action.
app.post('/articles/take-out', authenticateToken, async (req, res) => {
    const { articleId } = req.body;
    const userId = req.user.id;

    try {
        await prisma.$transaction(async (prisma) => {
            const article = await prisma.articles.update({
                where: { id: articleId, stock_status: 'in' },
                data: { stock_status: 'out' }
            });

            await prisma.article_out.create({
                data: { article_id: articleId, user_id: userId }
            });
        });

        res.json({ message: 'Article taken out' });
    } catch (error) {
        res.status(400).json({ error: 'Article not available or failed to take out' });
    }
});

// REMOVE or COMMENT OUT this block during development!
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

// 🚀 Launch the Server - Let the inventory magic begin on port 3000.
app.listen(3000, () => console.log('Server running on port 3000'));