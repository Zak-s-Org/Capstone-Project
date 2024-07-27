const pool = require("../utils/pool")
const express = require("express")
const router = express.Router()

router.get("/" , async (req,res) =>{
console.log("get route executed")
    try {
    const result = await pool.query(`
        SELECT * FROM users;`)
        res.status(200).json(result.rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error.message})
} 
})







module.exports = router