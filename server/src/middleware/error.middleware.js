import { validationResult } from 'express-validator'

export const errorHandler = (err, req, res, next) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().map(({ msg }) => msg))
  }

  const status = err.statusCode || err.status || 500
  return res.status(status).json({
    error: 'Internal Server Error',
    message: err?.message
  })
}

