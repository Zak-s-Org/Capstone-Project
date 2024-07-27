const pool = require("../utils/pool");
const express = require("express");
const router = express.Router();

// /api/users endpoint
router.get("/users", async (req, res) => {
    console.log("get users route executed");
    try {
        const result = await pool.query('SELECT * FROM users;');
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/users/:id", async (req, res) => {
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
        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;', [email, password]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        const result = await pool.query('UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *;', [email, password, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/users/:id", async (req, res) => {
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
    try {
        const result = await pool.query('SELECT * FROM products;');
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

router.post("/products", async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const result = await pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *;', [name, description, price]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/products/:id", async (req, res) => {
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

router.delete("/products/:id", async (req, res) => {
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
router.get("/carts", async (req, res) => {
    console.log("get carts route executed");
    try {
        const result = await pool.query('SELECT * FROM carts;');
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/carts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM carts WHERE id = $1;', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/carts", async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const result = await pool.query('INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;', [user_id, product_id, quantity]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/carts/:id", async (req, res) => {
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

router.delete("/carts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM carts WHERE id = $1;', [id]);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Search users by email
router.get("/users/email/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


// Search carts by user ID
router.get("/carts/user/:userId", async (req, res) => {
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
router.delete("/carts/product/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM carts WHERE product_id = $1 RETURNING *;',
            [productId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
