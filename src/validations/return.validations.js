import { check } from 'express-validator'
import { borrowValidations } from './borrow.validations.js'

export const returnValidations = [
    ...borrowValidations,
  check('borrow_id')
    .exists().withMessage('borrow_id is required')
    .isMongoId().withMessage('invalid borrow_id'),
]
