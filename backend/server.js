const express = require(`express`)
const cors = require('cors');
const createTables = require(`./utils/tables`)
const postsrouter = require(`./routes/routes`)
require("dotenv").config()

const app = express()
app.use(cors());
app.use(express.json())
createTables()

app.use("/api" , postsrouter)
const PORT = process.env.PORT  || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
}).on('error', (err) => {
    console.error('Error starting server:', err);
  })