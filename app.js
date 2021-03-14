//require packages and json file 
const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant.js')
const features = ['name', 'en_name', 'phone', 'rating', 'google_map', 'category', 'image', 'location', 'description']
const featureList = ['餐廳中文', '餐廳英文', '電話號碼', '饕客評分', '谷歌地圖', '餐廳類別', '照片網址', '餐廳地點', '餐廳描述']
const methodOverride = require('method-override')
//引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案。
const routes = require('./routes')

const usePassport = require('./config/passport')
const flash = require('connect-flash')


require('./config/mongoose.js')
//set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//use static files, body-parser, method_override, express-session and routes
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

//start and listen on the server
app.listen(port, () => {
  console.log(`App is now running on https://localhost:${port}`)
})
