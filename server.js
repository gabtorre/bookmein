// Ec
const express = require('express')
const app = express()
const controllers = require('./controllers')
const PORT = 4000;


app.use('/appointment',controllers)



// listener
app.listen(PORT, `App is running on port ${PORT}`)

