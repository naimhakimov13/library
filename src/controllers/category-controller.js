import Category from '../models/Category.js'

export const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find()
    res.send(categories)
  } catch (err) {
    next(err)
  }
}

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
    res.send(category)
  } catch (err) {
    next(err)
  }
}

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body
    const category = await Category.create({ name })
    res.status(201).send(category)
  } catch (err) {
    next(err)
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(category)
  } catch (err) {
    next(err)
  }
}

export const deleteCategoryById = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.status(204).json('Successfully removed')
  } catch (err) {
    next(err)
  }
}


