if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json').results

const seedUsers = [{
  email: 'user1@example.com',
  password: '12345678'
}, {
  email: 'user2@example.com',
  password: '12345678'
}]


db.once('open', async () => {

  await new Promise(function (resolve) {
    seedUsers.forEach((seedUser, index) => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({ email: seedUser.email, password: hash }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from({ length: 3 }, (_, i) => {
            return Restaurant.create({
              ...restaurantList[i + (index * 3)],
              userId
            })
          }))
        })
        .then(() => {
          console.log(`user${index} and restaurants done!`)
          if (index === 1) {
            resolve()
          }
        })
        .catch(err => console.log(err))
    })
  })
  process.exit()
})



