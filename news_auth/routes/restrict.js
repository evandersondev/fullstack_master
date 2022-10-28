const express = require('express')
const router = express.Router()
const News = require('../models/news')

router.get('/', (req, res) => {
  res.send('Restrict')
})

router.get('/news', async (req, res) => {
  const conditions = { category: 'private' }
  const news = await News.find(conditions)

  res.render('news/restrict', { news })
})

module.exports = router
