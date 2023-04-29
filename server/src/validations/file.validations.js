import { check } from 'express-validator'

export const fileValidations = [
  check('id')
    .exists()
    .withMessage('id is required')
]
