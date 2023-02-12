import { Router } from 'express'
import { createBook, deleteBookById, getBookById, getBooks, updateBookById } from '../controllers/book.controller.js'
import { bookValidation } from '../validations/book.validations.js'

const router = Router()

router.get('/', getBooks)

router.get('/:id', getBookById)

router.post('/', [...bookValidation, createBook])

router.put('/:id', updateBookById)

router.delete('/:id', deleteBookById)

export default router
