import { Router } from 'express'
import { createBorrowing, getBorrowingByUserId } from '../controllers/borrowing.controller.js'

const router = Router()

router.get('/:id', getBorrowingByUserId)

router.post('/', createBorrowing)

router.put('/:id', createBorrowing)

export default router
