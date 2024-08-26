const pool = require("./pool");
const bcrypt = require("bcrypt");

const seedUserInfo = async () => {
  try {
    await pool.query('BEGIN'); // Start transaction

    const saltRounds = 10;
    const hashedPassword1 = await bcrypt.hash("password123", saltRounds);
    const hashedPassword2 = await bcrypt.hash("password456", saltRounds);
    const hashedPasswordAdmin = await bcrypt.hash("admin", saltRounds);

    // Reset Users and Products tables and sequences
    await pool.query(`
      DELETE FROM public."Users";
      DELETE FROM public."Products";
      ALTER SEQUENCE public."Users_id_seq" RESTART WITH 1;
      ALTER SEQUENCE public."Products_id_seq" RESTART WITH 1;
    `);

    // Insert Users
    await pool.query(
      `
      INSERT INTO public."Users" (email, password) VALUES
      ($1, $2),
      ($3, $4),
      ($5, $6);
      `,
      ["admin", hashedPasswordAdmin, "Johnathonthomas@gmail.com", hashedPassword1, "Arnoldjack@gmail.com", hashedPassword2]
    );

    // Insert Products with proper escaping for single quotes
    try {
      await pool.query(`
        INSERT INTO public."Products" (name, description, price, image) VALUES
        ('Sigma APO 200-500mm f/2.8 EX DG Lens', 'Ever dreamed of becoming a nature photographer, a surveillance expert, and a strongman competitor? Now you can be all three at once! With this lens, every shot is a close-up—even if you''re standing a football field away.', 8000.00, 'https://content.api.news/v3/images/bin/161622485130fdd4fbc13195fab95543');
      `);
      console.log("Inserted Sigma APO 200-500mm");
    } catch (err) {
      console.error("Error inserting Sigma APO 200-500mm:", err.message);
    }

    try {
      await pool.query(`
        INSERT INTO public."Products" (name, description, price, image) VALUES
        ('Nokia 3310', 'Call it a phone, call it a weapon of mass communication, or just call it what it is: the ultimate throwback device for those who want to say, "They don''t make ''em like they used to."', 60.00, 'https://media.npr.org/assets/img/2017/02/15/gettyimages-90739545_wide-5d8ae4cd5a2949f1f60c04f0c60a8f8e88eee3f5.jpg?s=1100&c=85&f=webp');
      `);
      console.log("Inserted Nokia 3310");
    } catch (err) {
      console.error("Error inserting Nokia 3310:", err.message);
    }

    try {
      await pool.query(`
        INSERT INTO public."Products" (name, description, price, image) VALUES
        ('Cowboy Crocs', 'Perfect for everything from herding cattle (virtually, of course) to just showing off your love for all things uniquely stylish. Step into the frontier of fashion—one comfy Croc at a time!', 25.00, 'https://culted.com/wp-content/uploads/2023/10/Untitled-1-2-3.jpg');
      `);
      console.log("Inserted Cowboy Crocs");
    } catch (err) {
      console.error("Error inserting Cowboy Crocs:", err.message);
    }

    try {
      await pool.query(`
        INSERT INTO public."Products" (name, description, price, image) VALUES
        ('Barnacles Shirt', 'What a load of barnacles...', 25.00, 'https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C91RirYHlglL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png');
      `);
      console.log("Inserted Barnacles Shirt");
    } catch (err) {
      console.error("Error inserting Barnacles Shirt:", err.message);
    }

    try {
      await pool.query(`
        INSERT INTO public."Products" (name, description, price, image) VALUES
        ('Creeper Shirt', 'Kaboom!', 690.00, 'https://c.media-amazon.com/images/I/81UoqdISF4L._AC_SY741_.jpg');
      `);      
      console.log("Inserted Creeper Shirt");
    } catch (err) {
      console.error("Error inserting Creeper Shirt:", err.message);
    }
    
    try {
     await pool.query(`
        INSERT INTO public."Products" (name, description, price, image) VALUES
        ('The Best Cheese Printer Ever', 'Show everyone your cheesy side!', 420.00, 'https://c.media-amazon.com/images/I/81sOpDhztsL._AC_SL1500_.jpg');
      `);      
      console.log("Inserted The Best Cheese Printer Ever");
    } catch (err) {
      console.error("Error inserting The Best Cheese Printer Ever:", err.message);
    }

    try {
      await pool.query(`
         INSERT INTO public."Products" (name, description, price, image) VALUES
         ('Multitask Headphones', 'Warning: Wearing this might give off strong "I’m in charge" vibes. Ready to take calls, take charge, and take on the world? Strap this bad boy on and get to work—like a boss!', 150.00, 'https://cdn11.bigcommerce.com/s-ljmimsumsn/images/stencil/original/products/283/1101/SM1P02_-_Ex_2__83147.1603898507.jpg?c=2');
       `);      
       console.log("Inserted Multitask Headphones");
     } catch (err) {
       console.error("Error inserting Multitask Headphones:", err.message);
      }

    try {
      await pool.query(`
         INSERT INTO public."Products" (name, description, price, image) VALUES
         ('Star Trek Borg Cube Speaker', 'Warning: Wearing this might give off strong "This miniaturized version of the iconic Borg Cube delivers sound so immersive, it’s like the collective itself is in your living room, dropping bass that will assimilate your senses.', 200.00, 'https://c.media-amazon.com/images/I/81XfEGmKmsL._AC_SX679_.jpg');
       `);      
       console.log("Inserted Star Trek Borg Cube Speaker");
     } catch (err) {
       console.error("Error inserting Star Trek Borg Cube Speaker:", err.message);
     }  

    try {
      await pool.query(`
       INSERT INTO public."Products" (name, description, price, image) VALUES
       ('Reebok Pump Shoes', 'With a built-in pump that lets you inflate the shoes to your exact comfort level, you’ll feel like you’re walking on air, or at least strutting through a basketball court in an epic slow-motion montage.', 45.00, 'https://c.media-amazon.com/images/I/615BXRM3+-L._AC_SX695_.jpg');
     `);      
     console.log("Inserted Reebok Pump Shoes");
   } catch (err) {
     console.error("Error inserting Reebok Pump Shoes:", err.message);
   }

   try {
    await pool.query(`
       INSERT INTO public."Products" (name, description, price, image) VALUES
       ('Portable Bunker', 'Now available for the discerning survivalist who also appreciates comfort and style. Because why shouldn't your bunker be both functional and fashionable?', 5000.00, 'https://cdn.thisiswhyimbroke.com/thumb/exod-pod-01-inflatable-shelter_400x333.jpg');
     `);      
     console.log("Inserted Portable Bunker");
   } catch (err) {
     console.error("Error inserting Portable Bunker:", err.message);
   }

    await pool.query('COMMIT'); // Commit transaction
    console.log("Seeding completed successfully.");
  } catch (err) {
    await pool.query('ROLLBACK'); // Rollback transaction in case of error
    console.error("Error during seeding, rolling back:", err.message);
  }
};

seedUserInfo();

