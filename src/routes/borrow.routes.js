import { Router } from 'express'
import {
  createBorrow,
  deleteBorrowById,
  getBorrow,
  getBorrowByUserId,
  updateBorrow
} from '../controllers/borrow.controller.js'
import { borrowValidations, paramIdValidation } from '../validations/borrow.validations.js'

const router = Router()

router.get('/', getBorrow)

router.get('/:id', [paramIdValidation, getBorrowByUserId])

router.post('/', [borrowValidations, createBorrow])

router.put('/:id', [paramIdValidation, updateBorrow])

router.delete('/:id', [paramIdValidation, deleteBorrowById])

export default router
