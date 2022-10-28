const express = require('express')
const app = express()
const { join } = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const User = require('./models/user')
const News = require('./models/news')
const news = require('./routes/news')
const auth = require('./routes/auth')
const pages = require('./routes/pages')
const restrict = require('./routes/restrict')
const session = require('express-session')
const { request } = require('https')

mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://localhost/news'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(
  session({
    secret: 'fullstack-master',
  }),
)

app.use(express.static(join(__dirname, 'public')))

app.use((req, res, next) => {
  if ('user' in req.session) {
    res.locals.user = req.session.user
  }

  next()
})

app.use('/restrict', (req, res, next) => {
  if ('user' in req.session) {
    return next()
  }

  res.redirect('/login')
})
app.use('/restrict', restrict)
app.use('/news', news)
app.use('/', auth)
app.use('/', pages)

const createInitialUser = async () => {
  const total = await User.countDocuments({ username: 'evandersondev' })

  if (total === 0) {
    const user = new User({
      username: 'evandersondev',
      password: '123456',
    })

    await user.save(() => console.log('Saved successfully.'))
  } else {
    console.log('User already exists.')
  }

  const news = News({
    title: 'Public news ' + new Date().getTime(),
    content: 'Content',
    category: 'public',
  })

  const news2 = News({
    title: 'Public news ' + new Date().getTime(),
    content: 'Content',
    category: 'private',
  })

  // await news.save()
  // await news2.save()
}

mongoose
  .connect(mongo, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connection')
    app.listen(port, () => {
      createInitialUser()

      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch(err => console.error(err))
