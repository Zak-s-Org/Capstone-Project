const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../utils/pool");
const { authenticateToken } = require("../utils/auth");
const router = express.Router();

const JWT_SECRET = "9541c43edea25b5393069829e2bda135be967adf161e1cf3ce6f78b911e0ee8489a1e0cca88641046734aca196820439da2f30214fecfa87025b4289c8a56143";

// Login endpoint
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        const user = result.rows[0];
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/carts/user/me', authenticateToken, async (req, res) => {
    const userId = req.user.id; // Assuming user ID is stored in the token
    try {
      console.log(`Fetching cart items for user ID: ${userId}`); // Log user ID
      const result = await pool.query('SELECT * FROM carts WHERE user_id = $1;', [userId]);
      console.log('Cart items fetched:', result.rows); // Log fetched data
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching cart items:', error.message); // Log error
      res.status(500).json({ error: error.message });
    }
  });

// /api/users endpoint
router.get("/users", authenticateToken, async (req, res) => {
    console.log("get users route executed");
    try {
        const result = await pool.query('SELECT * FROM users;');
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/users/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/users", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;', [email, hashedPassword]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/users/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
        const result = await pool.query('UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *;', [email, hashedPassword, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/users/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1;', [id]);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// /api/products endpoint
router.get("/products", async (req, res) => {
    console.log("get products route executed");
    const { query } = req.query;
    try {
        let result;
        if (query) {
            result = await pool.query(
                'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1',
                [`%${query}%`]
            );
        } else {
            result = await pool.query('SELECT * FROM products;');
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1;', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/products", authenticateToken, async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const result = await pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *;', [name, description, price]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/products/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const result = await pool.query('UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *;', [name, description, price, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/products/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = $1;', [id]);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// /api/carts endpoint
router.get("/carts", authenticateToken, async (req, res) => {
    console.log("get carts route executed");
    try {
        const result = await pool.query('SELECT * FROM carts;');
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/carts/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM carts WHERE id = $1;', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/carts", authenticateToken, async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const result = await pool.query('INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;', [user_id, product_id, quantity]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/carts/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { user_id, product_id, quantity } = req.body;
    try {
        const result = await pool.query('UPDATE carts SET user_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *;', [user_id, product_id, quantity, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/carts/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM carts WHERE id = $1;', [id]);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/users/email/:email", authenticateToken, async (req, res) => {
    const { email } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Search carts by user ID
router.get("/carts/user/:userId", authenticateToken, async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM carts WHERE user_id = $1;', [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Delete carts by product ID
router.delete("/carts/product/:productId", authenticateToken, async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await pool.query('DELETE FROM carts WHERE product_id = $1 RETURNING *;', [productId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/products/byIds", async (req, res) => {
    const { ids } = req.body; // Expecting an array of product IDs
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = ANY($1);', [ids]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Delete a cart item by ID
router.delete("/carts/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM carts WHERE id = $1;', [id]);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Modify the quantity of a cart item
router.put("/carts/:id/quantity", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const result = await pool.query('UPDATE carts SET quantity = $1 WHERE id = $2 RETURNING *;', [quantity, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
