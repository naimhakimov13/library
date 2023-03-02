import { model, Schema } from 'mongoose'
import bcryptjs from 'bcryptjs'
import { getRandomInt } from '../utils/helper.js'

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student'
  },
  email: {
    type: String,
    unique: true
  },
  barcode: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phone: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  image: {
    public_id: String,
    url: {
      type: String,
      default: null
    }
  },
  status: {
    type: Number,
    enum: [1, 0],
    default: 1
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false
})

schema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    this.barcode = getRandomInt(1_000_000_000, 9_999_999_999)
    return next()
  } catch (err) {
    return next(err)
  }
})

schema.methods.validatePassword = async function(password) {
  return await bcryptjs.compare(password, this.password)
}

export default model('User', schema)
