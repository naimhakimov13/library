import { body } from 'express-validator'

export const bookValidation = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('title is required')
    .isString()
    .withMessage('title should be string'),

  body('category_id')
    .exists({ checkFalsy: true })
    .withMessage('category_id is required')
    .isMongoId()
    .withMessage('category_id is incorrect'),

  body('author')
    .exists({ checkFalsy: true })
    .withMessage('author is required')
    .isString()
    .withMessage('author should be string'),

  body('lang')
    .exists({ checkFalsy: true })
    .withMessage('lang is required')
    .isIn(['ru', 'tj', 'en', 'uz'])
    .withMessage('invalid lang, for example \'ru\', \'tj\', \'en\' or \'uz\''),

  body('release_year')
    .exists()
    .withMessage('release_year is required')
    .isLength({ min: 4, max: 4 })
    .withMessage('release_year field must be 4 character long')
    .matches(/(?:(?:18|19|20|21)[0-9]{2})/g)
    .withMessage('invalid release_year, for example 2001'),

  body('count_page')
    .exists({ checkFalsy: true })
    .withMessage('count_page is required')
    .isNumeric().withMessage('count_page should be number')
]
