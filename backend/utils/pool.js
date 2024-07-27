const {Pool} = require("pg");

const pool = new Pool ({
    user: "postgres",
    database : "capstone" ,
    password : "postgres",
    port : 4321
});

module.exports = pool;