require('dotenv').config()
const express =  require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const cors = require('cors')

const app =  express()
app.use(cors())
app.use(express.json())

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Server started on port',PORT))
        console.log("Connection has been established successfully.");
    } catch (e) {
        console.log("Unable to connect to the database:", e)
    }
}

start()