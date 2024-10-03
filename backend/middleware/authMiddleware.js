const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.auth = async (req, res, next) => {
  const token =
    req.header('Authorization') && req.header('Authorization').split(' ')[1]
  if (!token)
    return res.status(401).json({ msg: 'Nema tokena, autorizacija odbijena' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId).select('-password')
    if (!req.user) return res.status(401).json({ msg: 'Autorizacija odbijena' })
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token nije validan' })
  }
}
