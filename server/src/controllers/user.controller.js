import User from '../models/User.js'
import { buildUser, clean, normalizeFilter, notFound } from '../utils/helper.js'
import { Types } from 'mongoose'

export const signUp = async (req, res, next) => {
  try {
    const sameLogin = await User.findOne({ email: req.body.email })

    if (sameLogin) {
      return res.status(400).json({
        message: 'email already exist'
      })
    }

    const user = new User({
      ...req.body
    })

    const saveUser = await user.save()

    res.status(201).json(buildUser(saveUser))
  } catch (err) {
    next(err)
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    const error = { message: 'email or password incorrect' }

    if (!user) {
      return res.status(400).send(error)
    }

    const passwordCompare = await user.validatePassword(password)

    if (!passwordCompare) {
      return res.status(400).send(error)
    }

    res.json(buildUser(user))
  } catch (err) {
    next(err)
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const queryParams = clean(req.query)
    const filters = normalizeFilter(queryParams)
    const allUsers = await User.find({ $and: filters })
      .skip((queryParams.currentPage - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)

    const items = await User.count()

    res.json({
      currentPage: queryParams.currentPage || 0,
      pageSize: queryParams.pageSize || 10,
      content: allUsers,
      items
    })
  } catch (err) {
    next(err)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = Types.ObjectId.isValid(id) && await User.findOne({ _id: id })

    if (!user) {
      return notFound('user', res)
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({
      _id: req.params.id
    }, req.body, { new: true })

    if (!user) {
      return notFound('user', res)
    }

    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id })

    if (!user) {
      return notFound('user', res)
    }

    res.json({ message: 'Successfully removed' })
  } catch (err) {
    next(err)
  }
}



