const pool = require("./pool");
const bcrypt = require("bcrypt")

const seedUserInfo = async ()=>{
    try {
        const saltRounds = 10
        const hashedPassword1 = await bcrypt.hash("password123", saltRounds)
        const hashedPassword2 = await bcrypt.hash("password456", saltRounds)
        const hashedPasswordAdmin = await bcrypt.hash("admin", saltRounds)
        
        await pool.query(`
          DELETE FROM public."Users";
          DELETE FROM public."Products";
          ALTER SEQUENCE public."Users_id_seq" RESTART WITH 1;
          ALTER SEQUENCE public."Products_id_seq" RESTART WITH 1;
        `);
        
        await pool.query(`
            INSERT INTO public."Users" (email, password) VALUES
            ($1, $2),
            ($3, $4),
            ($5, $6);
          `, ["admin", hashedPasswordAdmin, "Johnathonthomas@gmail.com", hashedPassword1, "Arnoldjack@gmail.com", hashedPassword2]);
       
          
        await pool.query(` 
            INSERT INTO public."Products" (name, description, price, image) VALUES ('Apple iPhone 13', 'Latest model with A15 Bionic chip', 799.00, 'https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-13-starlight-09142021-b?wid=465&hei=465&fmt=webp');
            INSERT INTO public."Products" (name, description, price, image) VALUES ('Samsung Galaxy S21', 'Flagship phone with stunning display', 699.00, 'https://m.media-amazon.com/images/I/41ytILS8Y+S.jpg');
            INSERT INTO public."Products" (name, description, price, image) VALUES ('Sony WH-1000XM4', 'Industry-leading noise canceling headphones', 348.00, 'https://m.media-amazon.com/images/I/41ytILS8Y+S.jpg');
          `)


          console.log("success")
        } catch (err) {
          console.log("Error seeding user info", err);
        }

        
}
seedUserInfo()
