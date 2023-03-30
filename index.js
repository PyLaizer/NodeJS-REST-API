const express = require("express")
const app = express()

require('dotenv').config()

const getRouter = require('./routes/get.Router')

app.use(express.urlencoded({}))
app.use(express.json())

app.use("/books",getRouter)

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`Server running at https://localhost:${PORT}`)
})