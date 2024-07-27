const pool = require("./pool")

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(225) NOT NULL ,
            password VARCHAR(225) NOT NULL )
            `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS product (
            id SERIAL PRIMARY KEY,
            name VARCHAR(225) NOT NULL,
            description VARCHAR(225) NOT NULL,
            product VARCHAR(225) NOT NULL,
            price decimal NOT NULL)`)    

            console.log("tables created successfully")
        }
catch(err){
    console.log(err)
}
}

module.exports = createTables;