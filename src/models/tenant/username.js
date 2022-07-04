const Mongoose = require('mongoose')

const usernameSchema = new Mongoose.Schema(
  {
    username: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = usernameSchema
