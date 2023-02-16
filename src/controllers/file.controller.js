import fs from 'fs/promises'
import { join } from 'path'
import { __dirname } from '../utils/helper.js'

export const uploadFile = async (req, res, next) => {
  try {
    res.send({ name: req.file?.path })
  } catch (err) {
    next(err)
  }
}

export const removeFile = async (req, res, next) => {
  try {
    await fs.unlink(join(__dirname, '../..', req.body.name))
    res.send('Successfully removed')
  } catch (err) {
    next(err)
  }
}
