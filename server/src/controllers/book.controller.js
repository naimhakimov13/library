import BookModel from '../models/Book.js'
import { clean, getRandomInt, normalizeFilter } from '../utils/helper.js'

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
    const quantity = +req.body.quantity || 1
    delete req.body.quantity

    const bookList = Array(quantity).fill('').map((_) => ({
      ...req.body,
      barcode: getRandomInt(1_000_000_000, 9_999_999_999)
    }))

    const books = await BookModel.insertMany(bookList)
    res.status(201).send(books)
  } catch (err) {
    next(err)
  }
}

export const updateBookByISBN = async (req, res, next) => {
  try {
    const book = await BookModel.updateMany({ isbn: req.params.id }, { $set: req.body })
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
