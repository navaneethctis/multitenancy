const Mongoose = require('mongoose')

const tenantSchema = new Mongoose.Schema(
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

module.exports = tenantSchema
