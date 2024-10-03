const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const chatRoutes = require('./routes/chatRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Povezivanje na MongoDB
connectDB()

// Rute
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Server Error' })
})

module.exports = app
