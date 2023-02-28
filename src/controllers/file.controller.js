import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});

export const uploadStream = (fileStream, name) => {
  return new Promise((resolve, reject) => {
    return cloudinary.uploader.upload_stream({ public_id: name }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(fileStream)
  })
};


export const uploadFile = async (req, res, next) => {
  try {
    const data = await uploadStream(req.file.buffer)
    res.send({ public_id: data.public_id, url: data.url })
  } catch (err) {
    next(err)
  }
}

export const removeFile = async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(req.body.public_id)
    res.send('Successfully removed')
  } catch (err) {
    next(err)
  }
}
