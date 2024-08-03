const jwt = require('jsonwebtoken');
const pool = require("../utils/pool");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "9541c43edea25b5393069829e2bda135be967adf161e1cf3ce6f78b911e0ee8489a1e0cca88641046734aca196820439da2f30214fecfa87025b4289c8a56143";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // if there's no token

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // if the token is invalid

        req.user = user;
        next(); // proceed to the next middleware or route handler
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { authenticateToken, loginUser };
