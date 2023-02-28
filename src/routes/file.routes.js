import { Router } from 'express'
import multer from 'multer'

import { removeFile, uploadFile } from '../controllers/file.controller.js'
import { fileValidations } from '../validations/file.validations.js'
import { admin } from '../middleware/auth.middleware.js'

const router = Router()
const storage = multer.memoryStorage({})


const upload = multer({

  storage: storage,
  //limiting file size by 5Mb
  limits: { fileSize: 5 * 1024 * 1024 },
  //accepting only jpg jpeg png files
  fileFilter: function(req, file, cb) {
    const fileRegex = new RegExp('\.(jpg|jpeg|png|pdf|docx|doc)$')
    const fileName = file.originalname

    if (!fileName.match(fileRegex)) {
      //throw exception
      return cb(new Error('Invalid file type'))
    }
    //pass the file
    cb(null, true)
  }
})


router.post('/upload', [upload.single('file'), uploadFile])

router.post('/remove', [fileValidations, removeFile])

export default router
