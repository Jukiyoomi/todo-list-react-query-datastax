const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
dotenv.config()
const todoRoutes = require('./routes/todo.routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/todos', todoRoutes)

app.listen(process.env.PORT, () => {
    console.log('app on port ' + process.env.PORT)
})
