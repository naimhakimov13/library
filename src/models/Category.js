import { model, Schema } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
  }
)

export default model('Category', schema)
