import { Router } from 'express'

import { deleteUserById, getUserById, getUsers, updateUserById } from '../controllers/user.controller.js'
import { admin, auth } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', [admin, getUsers])

router.get('/:id', [auth, getUserById])

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

export default router
