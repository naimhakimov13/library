import { Router } from 'express'
import {
  createBorrow,
  deleteBorrowById,
  getBorrow,
  getBorrowByUserId,
  updateBorrow
} from '../controllers/borrow.controller.js'
import { borrowValidation, paramIdValidation } from '../validations/borrowValidation.js'
import { admin } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', getBorrow)

router.get('/:id', [paramIdValidation, getBorrowByUserId])

router.post('/', [borrowValidation, admin, createBorrow])

router.put('/:id', [paramIdValidation, admin, updateBorrow])

router.delete('/:id', [paramIdValidation, admin, deleteBorrowById])

export default router
