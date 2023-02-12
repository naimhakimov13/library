import { Router } from 'express'

import { signIn, signUp } from '../controllers/user.controller.js'
import { signInValidation, signUpValidation } from '../validations/user.validations.js'

const router = Router()

router.post('/signin', [signInValidation, signIn])

router.post('/signup', [signUpValidation, signUp])

export default router
