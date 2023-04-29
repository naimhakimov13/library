import { validationResult } from 'express-validator'
import jsonwebtoken from 'jsonwebtoken'
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
    token: jsonwebtoken.sign(userClone, 'super secret', {
      expiresIn: '7d'
    })
  }
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const clean = (obj) => {
  for (let propName in obj) {
    if (obj[propName] === '' || obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName]
    }
  }
  return obj
}


export const normalizeFilter = (obj) => {
  return Object.keys(clean(obj)).map((key) => ({
    [key]: typeof +obj[key] === 'number' && !isNaN(+obj[key]) ? +obj[key] : new RegExp(obj[key], 'i')
  }))
}

export function convertIntObj(obj) {
 let res = {}

  Object.keys(obj).forEach(key => {
    res = {
      [key]: isNaN(+obj[key]) ? obj[key] : +obj[key]
    }
  })

  return res
}
