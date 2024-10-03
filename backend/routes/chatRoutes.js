const express = require('express')
const router = express.Router()
const { getMessages } = require('../controllers/chatController')
const { auth } = require('../middleware/authMiddleware')

// @route   GET /api/chat/messages/:room
// @desc    Dohvatanje poruka za sobu
router.get('/messages/:room', auth, getMessages)

module.exports = router
