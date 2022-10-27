const express = require('express')
const app = express()
const { join } = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const User = require('./models/user')
const news = require('./routes/news')
const restrict = require('./routes/restrict')
const session = require('express-session')

mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://localhost/news'

app.use(
  express.json({
    type: 'application/json',
  }),
)

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(
  session({
    secret: 'fullstack-master',
  }),
)

app.use(express.static(join(__dirname, 'public')))

app.use('/restrict', (req, res, next) => {
  if ('user' in req.session) {
    return next()
  }

  res.redirect('/login')
})
app.use('/restrict', restrict)
app.use('/news', news)
app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  })

  console.log(req.body)
  res.json(user)
})

app.get('/', (req, res) => res.render('index'))

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
