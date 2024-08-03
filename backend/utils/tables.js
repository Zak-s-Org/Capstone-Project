const pool = require("./pool")

const createTables = async () => {
    try {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(225) UNIQUE NOT NULL ,
            password VARCHAR(225) NOT NULL )
            `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(225) UNIQUE NOT NULL,
            description VARCHAR(225) NOT NULL,
            price decimal NOT NULL)`)    

        await pool.query(`
            CREATE TABLE IF NOT EXISTS carts (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            product_id INT NOT NULL,
            quantity INT NOT NULL DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id),
            UNIQUE (user_id, product_id)
            );
        `);

        console.log("tables created successfully")
        }
catch(err){
    console.log(err)
}
}

module.exports = createTables;