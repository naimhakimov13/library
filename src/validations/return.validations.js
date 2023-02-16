import { check } from 'express-validator'
import { borrowValidation } from './borrowValidation.js'

export const returnValidations = [
    ...borrowValidation,
  check('borrow_id')
    .exists().withMessage('borrow_id is required')
    .isMongoId().withMessage('invalid borrow_id'),
]
