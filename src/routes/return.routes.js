import { Router } from 'express'
import {
  createReturn,
  deleteReturnById,
  getReturn,
  getReturnByUserId,
  updateReturn
} from '../controllers/return.controller.js'
import { paramIdValidation } from '../validations/borrowValidation.js'
import { returnValidations } from '../validations/return.validations.js'
import { admin } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', getReturn)

router.get('/:id', [paramIdValidation, getReturnByUserId])

router.post('/', [returnValidations, admin, createReturn])

router.put('/:id', [paramIdValidation, admin, updateReturn])

router.delete('/:id', [paramIdValidation, admin, deleteReturnById])

export default router
