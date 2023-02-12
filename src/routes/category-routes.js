import { Router } from 'express'
import {
  createCategory,
  deleteCategoryById,
  getCategory,
  getCategoryById,
  updateCategory
} from '../controllers/category-controller.js'
import { categoryValidation } from '../validations/category.validation.js'

const router = Router()

router.get('/', getCategory)

router.get('/:id', getCategoryById)

router.post('/', [...categoryValidation, createCategory])

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategoryById)

export default router
