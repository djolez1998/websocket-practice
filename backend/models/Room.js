const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  messages: [
    {
      sender: String,
      content: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
