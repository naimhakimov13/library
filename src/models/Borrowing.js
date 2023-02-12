import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
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
    date_borrowed: {
      type: String,
      default: new Date().toISOString()
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
  }
)

export default model('Borrowing', schema)
