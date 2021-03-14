const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const features = ['name', 'en_name', 'phone', 'rating', 'google_map', 'category', 'image', 'location', 'description']
const featureList = ['餐廳中文', '餐廳英文', '電話號碼', '饕客評分', '谷歌地圖', '餐廳類別', '照片網址', '餐廳地點', '餐廳描述']

//set router of new page
router.get('/new', ((req, res) => {
  res.render('new', { featureList, features })
}))

router.post('/', ((req, res) => {
  if (req.body.image.length === 0) { req.body.image = 'https://cdn.iconscout.com/icon/free/png-256/restaurant-1495593-1267764.png' }
  const re = /\(?0?\d?\)?\s?\d{3,4}\-?\d{4}/
  if (!req.body.phone.match(re)) {
    alert("不是正確的號碼格式")
  }
  req.body.userId = req.user._id
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => res.send(error))
}))

//set router of show page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => res.send(error))
})

//set router of edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => res.send(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  let restaurant_modified = req.body
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => {
      features.forEach(i => {
        restaurant[i] = restaurant_modified[i]
      })
      restaurant.save()
      return restaurant
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => res.send(error))
})

//set router of delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => res.send(error))
})

module.exports = router