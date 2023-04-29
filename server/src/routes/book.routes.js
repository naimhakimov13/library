import { Router } from 'express'
import {
  createBook,
  getBookById,
  getBooks,
  updateBookByISBN,
  deleteBookById
} from '../controllers/book.controller.js'
import { bookValidation } from '../validations/book.validations.js'
import { paramIdValidation } from '../validations/borrowValidation.js'
import { admin } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', getBooks)

router.get('/:id', [paramIdValidation, getBookById])

router.post('/', [bookValidation, admin, createBook])

router.put('/:id', [admin, updateBookByISBN])

router.delete('/:id', [paramIdValidation, admin, deleteBookById])

export default router
