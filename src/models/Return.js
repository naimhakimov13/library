import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
    borrow_id: {
      type: Schema.Types.ObjectId,
      ref: 'Borrow',
      required: true
    },
    book_id: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
  }
)

export default model('Return', schema)
