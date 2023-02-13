import { check, query } from 'express-validator'

export const borrowValidations = [
  check('user_id')
    .exists().withMessage('user_id is required')
    .isMongoId().withMessage('invalid user_id'),

  check('user_id')
    .exists().withMessage('user_id is required')
    .isMongoId().withMessage('invalid user_id'),
]

export const paramIdValidation = [
  query('id')
    .isMongoId().withMessage('invalid query params')
]
