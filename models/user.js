//require mongoose
const mongoose = require('mongoose')

//set Schema
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

//export model
module.exports = mongoose.model('User', userSchema)