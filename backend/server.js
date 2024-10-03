const http = require('http')
const app = require('./app')
const socketio = require('socket.io')
const dotenv = require('dotenv')
const Room = require('./models/Room')
const Message = require('./models/Message')

dotenv.config()

const PORT = process.env.PORT || 5000
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const createGeneralRoom = async () => {
  try {
    const generalRoom = await Room.findOne({ name: 'General' })
    if (!generalRoom) {
      await Room.create({ name: 'General' })
      console.log('General room created')
    } else {
      console.log('General room already exists')
    }
  } catch (error) {
    console.error('Error creating General room:', error)
  }
}

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id)

  socket.on('joinRoom', ({ room }) => {
    socket.join(room)
    console.log(`Socket ${socket.id} joined room ${room}`)
  })

  socket.on('chatMessage', async ({ room, message, user }) => {
    try {
      const newMessage = await Message.create({ room, user, message })
      io.to(room).emit('message', { user, message, time: newMessage.time })
    } catch (error) {
      console.error('Error saving message:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Kreiraj "General" sobu pre nego što pokreneš server
createGeneralRoom()

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
