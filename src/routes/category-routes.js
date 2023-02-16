import { Router } from 'express'
import {
  createCategory,
  deleteCategoryById,
  getCategory,
  getCategoryById,
  updateCategory
} from '../controllers/category-controller.js'
import { categoryValidation } from '../validations/category.validation.js'
import { paramIdValidation } from '../validations/borrowValidation.js'
import { admin } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', getCategory)

router.get('/:id', [paramIdValidation, getCategoryById])

router.post('/', [categoryValidation, createCategory])

router.put('/:id', [paramIdValidation, admin, updateCategory])

router.delete('/:id', [paramIdValidation, admin, deleteCategoryById])

export default router
