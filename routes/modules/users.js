const express = require('express')
const router = express.Router()
const User = require('../../models/user')

//set router of register page
router.get('/register', ((req, res) => {
  res.render('register')
}))

module.exports = router