const express = require("express")
const helmet = require('helmet')
const cors  = require('cors')
const rateLimit = require("express-rate-limit")
const errorMiddleware = require("./middleware/error.middleware")
const routes  = require('./routes/index')
const morgan = require("morgan")



// security
const app = express()
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())

// Body praser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes:
app.use('/api',routes)

// Error handler
app.use(errorMiddleware)

module.exports = app