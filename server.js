// Ec
const express = require('express')
const app = express()
const controllers = require('./controllers')
const PORT = 4000;


app.use('/compnay',controllers.company)
app.use('/user', controllers.user)



// listener
app.listen(PORT, `App is running on port ${PORT}`)

