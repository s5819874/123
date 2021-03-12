//require mongoose
const mongoose = require('mongoose')

//set Schema
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: String,
  phone: String,
  rating: Number,
  google_map: String,
  category: String,
  image: String,
  location: String,
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    index: true,
    required: true
  }
})

//export model
module.exports = mongoose.model('Restaurant', restaurantSchema)