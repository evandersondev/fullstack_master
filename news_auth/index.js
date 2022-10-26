const express = require('express')
const app = express()
const {join} = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://localhost/news'

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index'))

mongoose.connect(mongo, {useNewUrlParser: true})
  .then(() => {
    console.log('MongoDB connection')
    app.listen(port,  () => console.log('Server is running'))
  }).catch(err => console.error(err))

