const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../utils/auth");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const JWT_SECRET = "9541c43edea25b5393069829e2bda135be967adf161e1cf3ce6f78b911e0ee8489a1e0cca88641046734aca196820439da2f30214fecfa87025b4289c8a56143";

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

// Fetch cart items for the logged-in user
router.get('/carts/user/me', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    console.log(`Fetching cart items for user ID: ${userId}`);
    const result = await prisma.carts.findMany({ where: { userId } });
    console.log('Cart items fetched:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// /api/users endpoints
router.get("/users", authenticateToken, async (req, res) => {
  try {
    const result = await prisma.users.findMany();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/users/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({ where: { id: parseInt(id) } });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/users", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await prisma.users.create({ data: { email, password: hashedPassword } });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/users/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await prisma.users.update({
      where: { id: parseInt(id) },
      data: { email, password: hashedPassword },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/users/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// /api/products endpoints
router.get("/products", async (req, res) => {
  try {
    const result = await prisma.products.findMany();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({ where: { id: parseInt(id) } });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/products", authenticateToken, async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await prisma.products.create({ data: { name, description, price } });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/products/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const product = await prisma.products.update({
      where: { id: parseInt(id) },
      data: { name, description, price },
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/products/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.products.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// /api/carts endpoints
router.get("/carts", authenticateToken, async (req, res) => {
  try {
    const result = await prisma.carts.findMany();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/carts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.carts.findUnique({
      where: {
        id: parseInt(id, 10),  // Ensuring `id` is an integer
      },
    });
    res.json(result);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Error fetching cart' });
  }
});


router.post("/carts", authenticateToken, async (req, res) => {
  const { userId, productId, quantity } = req.body;  // Ensure camelCase naming
  try {
    const result = await prisma.carts.create({
      data: {
        userId,      // Correct field name
        productId,   // Correct field name
        quantity,
      },
    });
    res.json(result);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Error creating cart' });
  }
});


router.put("/carts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { userId, productId, quantity } = req.body;
  try {
    const result = await prisma.carts.update({
      where: { id: parseInt(id) },
      data: {
        userId,
        productId,
        quantity
      }
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/carts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.carts.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Search carts by user ID
router.get("/carts/user/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const carts = await prisma.carts.findMany({ where: { userId: parseInt(userId) } });
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete carts by product ID
router.delete("/carts/product/:productId", authenticateToken, async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedCart = await prisma.carts.delete({
      where: { productId: parseInt(productId) }
    });
    res.status(200).json(deletedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch products by an array of IDs
router.post("/products/byIds", async (req, res) => {
  const { ids } = req.body;
  try {
    const products = await prisma.products.findMany({
      where: { id: { in: ids } }
    });
    res.status(200).json(products);
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
    const updatedCart = await prisma.carts.update({
      where: { id: parseInt(id) },
      data: { quantity: parseInt(quantity) }
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
