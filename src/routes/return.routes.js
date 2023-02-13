import { Router } from 'express'
import {
  createReturn,
  deleteReturnById,
  getReturn,
  getReturnByUserId,
  updateReturn
} from '../controllers/return.controller.js'
import { paramIdValidation } from '../validations/borrow.validations.js'
import { returnValidations } from '../validations/return.validations.js'

const router = Router()

router.get('/', getReturn)

router.get('/:id', [paramIdValidation, getReturnByUserId])

router.post('/', [returnValidations, createReturn])

router.put('/:id', [paramIdValidation, updateReturn])

router.delete('/:id', [paramIdValidation, deleteReturnById])

export default router
