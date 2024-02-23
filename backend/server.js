const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleWares/errorMiddleWare')
const connectDB = require('./config/db')

port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server start running on port ${port}`)
})