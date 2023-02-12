import { model, Schema } from 'mongoose'
import { getRandomInt } from '../utils/helper.js'

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
    enum: ['ru', 'tj', 'uz', 'en']
  },
  quantity: {
    type: Number,
    default: 0
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
  pdf: {
    type: String,
    default: null
  },
  status: {
    type: Number,
    enum: [1, 0],
    default: 1
  },
  barcode: {
    type: Number,
    unique: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

schema.pre('save', function() {
  this.barcode = getRandomInt(1_000_000_000, 9_999_999_999)
})


export default model('Book', schema)
