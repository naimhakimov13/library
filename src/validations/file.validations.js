import { check } from 'express-validator'

export const fileValidations = [
  check('name')
    .exists()
    .withMessage('name is required')
]
