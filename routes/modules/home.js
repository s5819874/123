const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

//set router of root page
router.get('/', ((req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => res.sendStatus(404))
}))

module.exports = router