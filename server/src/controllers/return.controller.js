import Return from '../models/Return.js'
import Borrow from '../models/Borrow.js'

export const getReturn = async (req, res, next) => {
  try {
    const data = await Return.find().populate('user_id').populate('book_id')
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const createReturn = async (req, res, next) => {
  try {
    const body = req.body

    const returnData = await Return.findOne({ borrow_id: body.borrow_id })
    const borrowData = await Borrow.findOne({ user_id: body.user_id, book_id: body.book_id })

    if (!returnData && borrowData) {
      return res.status(400).json({ message: 'Already exists or borrow_id not found' })
    }

    const data = Object.assign(body, {})
    const result = await Return.create(data)
    res.send(result)
  } catch (err) {
    next(err)
  }
}

export const getReturnByUserId = async (req, res, next) => {
  try {
    const result = await Return.find({ user_id: req.params.id }).populate('user_id').populate('book_id')
    res.send(result)
  } catch (err) {
    next(err)
  }
}

export const deleteReturnById = async (req, res, next) => {
  try {
    await Return.findByIdAndDelete(req.params.id)
    res.status(204)
  } catch (err) {
    next(err)
  }
}

export const updateReturn = async (req, res, next) => {
  try {
    const result = await Return.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(result)
  } catch (err) {
    next(err)
  }
}
