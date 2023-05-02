import { model, Schema } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: String,
  lang: {
    type: String,
    required: true,
    enum: ['ru', 'tj', 'uz', 'en'],
    default: 'tj'
  },
  release_year: {
    type: Number,
    required: true
  },
  count_page: {
    type: Number,
    required: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  image: {
    type: String,
    default: null
  },
  quantity: {
    type: Number,
    default: 1
  },
  pdf: {
    type: String,
    default: null
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 1
  },
  barcode: {
    type: Number,
    unique: true
  },
  price: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

export default model('Book', schema)
