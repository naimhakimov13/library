import Borrowing from '../models/Borrow.js'

export const getBorrow = async (req, res, next) => {
  try {
    const data = await Borrowing.find().populate('user_id').populate('book_id')
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const createBorrow = async (req, res, next) => {
  try {
    const body = req.body

    const borrowing = await Borrowing.findOne({ user_id: body.user_id, book_id: body.book_id })
    if (borrowing) {
      return res.status(400).json({ message: 'Already exists' })
    }

    const data = Object.assign(body, {})
    const result = await Borrowing.create(data)
    res.send(result)
  } catch (err) {
    next(err)
  }
}

export const getBorrowByUserId = async (req, res, next) => {
  try {
    const result = await Borrowing.find({ user_id: req.params.id }).populate('user_id').populate('book_id')
    res.send(result)
  } catch (err) {
    next(err)
  }
}

export const deleteBorrowById = async (req, res, next) => {
  try {
    await Borrowing.findByIdAndDelete(req.params.id)
    res.status(204).json()
  } catch (err) {
    next(err)
  }
}

export const updateBorrow = async (req, res, next) => {
  try {
    const result = await Borrowing.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(result)
  } catch (err) {
    next(err)
  }
}
