const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

//set router of search results
router.get('/', ((req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  return Restaurant.find({
    userId,
    $or: [
      {
        category: {
          $regex: keyword,
          $options: 'i'
        }
      },
      {
        name: {
          $regex: keyword,
          $options: 'i'
        }
      },
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(err => res.send(err))
}))

module.exports = router