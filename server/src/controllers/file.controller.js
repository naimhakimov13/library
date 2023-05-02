import fs from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export const uploadFile = async (req, res, next) => {
  try {
    res.send(req.file?.path)
  } catch (err) {
    next(err)
  }
}

export const removeFile = async (req, res, next) => {
  try {
    await fs.unlink(join(__dirname, '../../..', req.body.url))
    res.send({ message: 'Successfully removed' })
  } catch (err) {
    next(err)
  }
}
