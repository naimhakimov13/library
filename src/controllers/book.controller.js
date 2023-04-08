import BookModel from '../models/Book.js'
import { clean, normalizeFilter } from '../utils/helper.js'

export const getBooks = async (req, res, next) => {
  try {
    const queryParams = clean(req.query)
    const filters = normalizeFilter(queryParams)

    const books = await BookModel.find({ $and: filters })
      .skip((queryParams.currentPage - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)

    const items = await BookModel.count()

    res.json({
      currentPage: queryParams.currentPage || 0,
      pageSize: queryParams.pageSize || 10,
      content: books,
      items
    })
  } catch (err) {
    next(err)
  }
}

export const getBookById = async (req, res, next) => {
  try {
    const book = await BookModel.findById(req.params.id).populate('category_id')
    res.send(book)
  } catch (err) {
    next(err)
  }
}

export const createBook = async (req, res, next) => {
  try {
    const book = await BookModel.create(req.body)
    res.status(201).send(book)
  } catch (err) {
    next(err)
  }
}

export const updateBookById = async (req, res, next) => {
  try {
    const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(book)
  } catch (err) {
    next(err)
  }
}

export const deleteBookById = async (req, res, next) => {
  try {
    await BookModel.findByIdAndDelete(req.params.id)
    res.status(204).json('Successfully removed')
  } catch (err) {
    next(err)
  }
}
