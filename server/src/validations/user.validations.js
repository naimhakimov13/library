import { check } from 'express-validator'

export const signInValidation = [
  check('email').exists().withMessage('email is required').isEmail().withMessage('email should be string'),
  check('password').exists().withMessage('password is required').isLength({ min: 6 }).withMessage('minimum length 6')
]

export const signUpValidation = [
  ...signInValidation,
  check('gender')
    .exists().withMessage('gender is required')
    .isIn(['male', 'female']).withMessage('invalid gender, for example male of female'),

  check('role')
    .exists().withMessage('role is required')
    .isIn(['teacher', 'admin', 'student']).withMessage('invalid role, for example \'admin\', \'teacher\' or \'student\''),
]
