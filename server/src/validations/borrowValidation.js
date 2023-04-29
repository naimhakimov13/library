import { check, query } from 'express-validator'

export const borrowValidation = [
  check('user_id')
    .exists().withMessage('user_id is required')
    .isMongoId().withMessage('invalid user_id'),

  check('book_id')
    .exists().withMessage('book_id is required')
    .isMongoId().withMessage('invalid book_id'),
]

export const paramIdValidation = [
  query('id')
    .isMongoId().withMessage('invalid query params')
]
