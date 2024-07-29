const pool = require("./pool");
const bcrypt = require("bcrypt")

const seedUserInfo = async ()=>{
    try {
        const saltRounds = 10
        const hashedPassword1 = await bcrypt.hash("password123", saltRounds)
        const hashedPassword2 = await bcrypt.hash("password456", saltRounds)
    
        await pool.query(`
          DELETE FROM users`)

        await pool.query(`
          DELETE FROM products`)
        
        await pool.query(`
          DELETE FROM carts`)
        
        await pool.query(`
            INSERT INTO users (email, password) VALUES
            ($1, $2),
            ($3, $4);
          `, ["Johnathonthomas@gmail.com", hashedPassword1, "Arnoldjack@gmail.com", hashedPassword2]);
       
          await pool.query(` 
              INSERT INTO products (name, description, price) VALUES ('Creeper Shirt', 'Kaboom!', 690.00);
              INSERT INTO products (name, description, price) VALUES ('The Best Cheese Printer Ever', 'Show everyone your cheesy side!', 420.00);
              INSERT INTO products (name, description, price) VALUES ('Apple iPhone 13', 'Latest model with A15 Bionic chip', 799.00);
              INSERT INTO products (name, description, price) VALUES ('Samsung Galaxy S21', 'Flagship phone with stunning display', 699.00);
              INSERT INTO products (name, description, price) VALUES ('Sony WH-1000XM4', 'Industry-leading noise canceling headphones', 348.00);
              `)
          
          

          console.log("success")
        } catch (err) {
          console.log("Error seeding user info", err);
        }

        
}
seedUserInfo()


