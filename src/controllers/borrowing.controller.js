import Borrowing from '../models/Borrowing.js'

export const createBorrowing = async (req, res, next) => {
  try {
    const data = Object.assign(req.body, {})
    const result = await Borrowing.create(data)
    res.send(result)
  } catch (err) {
    next(err)
  }
}

export const getBorrowingByUserId = async (req, res, next) => {
  try {
    const result = await Borrowing.find({ user_id: req.params.id })
    res.send(result)
  } catch (err) {
    next(err)
  }
}
