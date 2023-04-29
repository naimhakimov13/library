import { Router } from 'express'

import { deleteUserById, getUserById, getUsers, updateUserById } from '../controllers/user.controller.js'
import { admin } from '../middleware/auth.middleware.js'
import { paramIdValidation } from '../validations/borrowValidation.js'

const router = Router()

router.get('/', [admin, getUsers])

router.get('/:id', [paramIdValidation, admin, getUserById])

router.put('/:id', [paramIdValidation, admin, updateUserById])

router.delete('/:id', [paramIdValidation, admin, deleteUserById])

export default router
