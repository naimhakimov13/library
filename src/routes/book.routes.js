import { Router } from 'express'
import { createBook, deleteBookById, getBookById, getBooks, updateBookById } from '../controllers/book.controller.js'
import { bookValidation } from '../validations/book.validations.js'
import { admin } from '../middleware/auth.middleware.js'
import { paramIdValidation } from '../validations/borrowValidation.js'

const router = Router()

router.get('/', getBooks)

router.get('/:id', [paramIdValidation, getBookById])

router.post('/', [bookValidation, admin, createBook])

router.put('/:id', [paramIdValidation, admin, updateBookById])

router.delete('/:id', [paramIdValidation, admin, deleteBookById])

export default router
