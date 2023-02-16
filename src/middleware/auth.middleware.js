import { verify } from 'jsonwebtoken'
import config from 'config'
import User from '../models/User.js'

export const auth = async (req, res, next, isAdmin = false) => {
  if (!req.headers.authorization) {
    req.user = null
    return res.status(401).send({ message: 'Not authorized' })
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decode = verify(token, config.get('secret'))
    req.user = await User.findOne({ _id: decode._id })
    if (isAdmin && req.user.role === 'admin') {
      return next()
    } else if (isAdmin && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'You don\'t have access' })
    }
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' })
  }
}

export const admin = async (req, res, next) => {
  await auth(req, res, next, true)
}
