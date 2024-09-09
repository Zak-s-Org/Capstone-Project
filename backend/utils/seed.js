const pool = require("./pool");
const bcrypt = require("bcrypt");

const seedUserInfo = async () => {
  try {
    await pool.query('BEGIN'); // Start transaction
    const saltRounds = 10;
    const hashedPassword1 = await bcrypt.hash("password123", saltRounds);
    const hashedPassword2 = await bcrypt.hash("password456", saltRounds);
    const hashedPasswordAdmin = await bcrypt.hash("admin", saltRounds);

    // Reset Users, Products, Orders, and OrderItems tables and sequences
    await pool.query(`
      DELETE FROM public."OrderItems";
      DELETE FROM public."Orders";
      DELETE FROM public."Carts";
      DELETE FROM public."Products";
      DELETE FROM public."Users";
      ALTER SEQUENCE public."Users_id_seq" RESTART WITH 1;
      ALTER SEQUENCE public."Products_id_seq" RESTART WITH 1;
      ALTER SEQUENCE public."Orders_id_seq" RESTART WITH 1;
      ALTER SEQUENCE public."OrderItems_id_seq" RESTART WITH 1;
    `);

    // Insert Users
    const userResult = await pool.query(
      `
      INSERT INTO public."Users" (email, password) VALUES
      ($1, $2),
      ($3, $4),
      ($5, $6)
      RETURNING id;
      `,
      ["admin", hashedPasswordAdmin, "Johnathonthomas@gmail.com", hashedPassword1, "Arnoldjack@gmail.com", hashedPassword2]
    );

    const adminId = userResult.rows[0].id;
      
    // Insert Products
    const productInsertions = [
      ['Sigma APO 200-500mm f/2.8 EX DG Lens', 'Ever dreamed of becoming a nature photographer...', 8000.00, 'https://content.api.news/v3/images/bin/161622485130fdd4fbc13195fab95543'],
      ['Nokia 3310', 'Call it a phone, call it a weapon of mass communication...', 60.00, 'https://media.npr.org/assets/img/2017/02/15/gettyimages-90739545_wide-5d8ae4cd5a2949f1f60c04f0c60a8f8e88eee3f5.jpg?s=1100&c=85&f=webp'],
      ['Cowboy Crocs', 'Perfect for everything from herding cattle...', 25.00, 'https://culted.com/wp-content/uploads/2023/10/Untitled-1-2-3.jpg'],
      ['Barnacles Shirt', 'What a load of barnacles...', 25.00, 'https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C91RirYHlglL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png'],
      ['Creeper Shirt', 'Kaboom!', 690.00, 'https://c.media-amazon.com/images/I/81UoqdISF4L._AC_SY741_.jpg'],
      ['The Best Cheese Printer Ever', 'Show everyone your cheesy side!', 420.00, 'https://c.media-amazon.com/images/I/81sOpDhztsL._AC_SL1500_.jpg'],
      ['Multitask Headphones', 'Warning: Wearing this might give off strong "I am in charge" vibes...', 150.00, 'https://cdn11.bigcommerce.com/s-ljmimsumsn/images/stencil/original/products/283/1101/SM1P02_-_Ex_2__83147.1603898507.jpg?c=2'],
      ['Star Trek Borg Cube Speaker', 'This miniaturized version of the iconic Borg Cube...', 200.00, 'https://c.media-amazon.com/images/I/81XfEGmKmsL._AC_SX679_.jpg'],
      ['Reebok Pump Shoes', 'With a built-in pump that lets you inflate the shoes...', 45.00, 'https://c.media-amazon.com/images/I/615BXRM3+-L._AC_SX695_.jpg'],
      ['Portable Bunker', 'Now available for the discerning survivalist...', 5000.00, 'https://cdn.thisiswhyimbroke.com/thumb/exod-pod-01-inflatable-shelter_400x333.jpg']
    ];

    const productValues = productInsertions.map((product) => `('${product[0]}', '${product[1]}', ${product[2]}, '${product[3]}')`).join(", ");

    const productResult = await pool.query(`
      INSERT INTO public."Products" (name, description, price, image)
      VALUES ${productValues}
      RETURNING id;
    `);

    const productIds = productResult.rows.map(row => row.id);

    // Insert a sample order for the admin user
    const orderResult = await pool.query(`
      INSERT INTO public."Orders" ("userId", total) VALUES ($1, $2) RETURNING id;
    `, [adminId, 8000.00]);

    const orderId = orderResult.rows[0].id;

    // Insert sample OrderItems for the order
    await pool.query(`
      INSERT INTO public."OrderItems" ("orderId", "productId", quantity, price) VALUES
      ($1, $2, $3, $4),
      ($1, $5, $6, $7);
    `, [orderId, productIds[0], 1, 8000.00, productIds[1], 1, 60.00]);


    await pool.query('COMMIT'); // Commit transaction
    console.log("Seeding completed successfully.");
  } catch (err) {
    await pool.query('ROLLBACK'); // Rollback transaction in case of error
    console.error("Error during seeding, rolling back:", err.message);
  }
};

seedUserInfo();
