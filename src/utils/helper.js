import { validationResult } from 'express-validator'
import jsonwebtoken from 'jsonwebtoken'
import config from 'config'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const validationError = (res, req, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
}

export const notFound = (key, res) => {
  return res.status(404).json({
    message: `${key} not found`
  })
}

export const buildUser = (user) => {
  const userClone = JSON.parse(JSON.stringify((user)))
  delete userClone.password
  return {
    user: {
      ...userClone
    },
    token: jsonwebtoken.sign(userClone, config.get('secret'), {
      expiresIn: '7d'
    })
  }
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
