
export const uploadFile = async (req, res, next) => {
  try {
    res.send({ name: req.file?.path })
  } catch (err) {
    next(err)
  }
}
