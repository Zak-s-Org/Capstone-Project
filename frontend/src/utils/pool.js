const {Pool} = require("pg");

const pool = new Pool ({
    user: "postgres",
    database : "capstone" ,
    password : "bryce2004",
    port : 5432
});

module.exports = pool;