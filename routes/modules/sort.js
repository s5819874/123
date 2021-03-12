const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

router.get('/AtoZ', ((req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => res.send(error))
}))

router.get('/ZtoA', ((req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => res.send(error))
}))

router.get('/category', ((req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => res.send(error))
}))

router.get('/rating', ((req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => res.send(error))
}))

module.exports = router