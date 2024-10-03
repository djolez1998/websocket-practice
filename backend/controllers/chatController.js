const Message = require('../models/Message')
const Room = require('../models/Room')

exports.getMessages = async (req, res) => {
  const { room } = req.params
  try {
    const roomExists = await Room.findOne({ name: room })
    if (!roomExists) {
      return res.status(404).json({ message: 'Room not found' })
    }
    const messages = await Message.find({ room }).sort({ time: 1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
