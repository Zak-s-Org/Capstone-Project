const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../utils/pool");
const { authenticateToken } = require("../utils/auth");
const router = express.Router();
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const JWT_SECRET = "9541c43edea25b5393069829e2bda135be967adf161e1cf3ce6f78b911e0ee8489a1e0cca88641046734aca196820439da2f30214fecfa87025b4289c8a56143";

// explain that table data is seeded via terminal , 
// 

// Login endpoint
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        // User already exists, check password
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
          return res.status(401).json({ error: "Invalid email or password" });
        }
  
        // Generate token and return
        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
      } else {
        // User does not exist, create new user
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await prisma.users.create({
          data: { email, password: hashedPassword },
        });
  
        // Generate token and return
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
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
      const result = await prisma.carts.findMany({ where: { userId } });
      console.log('Cart items fetched:', result); // Log fetched data
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching cart items:', error.message); // Log error
      res.status(500).json({ error: error.message });
    }
  });

// /api/users endpoint
router.get("/users", authenticateToken, async (req, res) => {
    console.log("get users route executed");
    try {
        const result = await prisma.users.findMany()
        res.status(200).json(result);
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
      const hashedPassword = await bcrypt.hash(password, 8); // 10 salt rounds
      const user = await prisma.users.create({ data: { email, password: hashedPassword } });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
})


router.put("/users/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8); // 10 salt rounds
    const user = await prisma.user.update({
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
      await prisma.user.delete({ where: { id: parseInt(id) } });
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
      let result;
        result = await prisma.products.findMany();
      res.status(200).json(result);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await prisma.products.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
})

router.post("/products", authenticateToken, async (req, res) => {
    const { name, description, price } = req.body;
    try {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
        },
      });
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
      const product = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          description,
          price,
        },
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
      await prisma.product.delete({
        where: {
          id: parseInt(id),
        },
      });
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
        const result = await prisma.carts.findMany()
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
                id: parseInt(id),
        }
    })
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/carts", authenticateToken, async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const result = await prisma.carts.create({
          data : {
            user_id,
            product_id,
            quantity
          }
        })
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/carts/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { user_id, product_id, quantity } = req.body;
    try {
        const result = await prisma.carts.update({
          where: {
            id : parseInt(id)
        },
        data : {
          user_id,
          product_id,
          quantity
        }
    })
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/carts/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cart.delete({
          where: {
            id : parseInt(id)
        }
    })
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/users/email/:email", authenticateToken, async (req, res) => {
  const { email } = req.params;
  try {
    const users = await prisma.users.findMany({
      where: {
        email,
      },
    });
    if (users.length > 0) {
      res.status(200).json(users[0]);
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
    const carts = await prisma.carts.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
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
      where: {
        productId: parseInt(productId),
      },
    });
    res.status(200).json(deletedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/products/byIds", async (req, res) => {
  const { ids } = req.body;
  try {
    const products = await prisma.products.findMany({
      where: {
        id: { in: ids },
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a cart item by ID
router.delete("/carts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.carts.delete({
      where: {
        id: parseInt(id),
      },
    });
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
    const updatedCart = await prisma.cart.update({
      where: { id: parseInt(id) },
      data: { quantity: parseInt(quantity) },
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
