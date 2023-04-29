import { body } from 'express-validator'

export const categoryValidation = [
  body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name should be string')
]
