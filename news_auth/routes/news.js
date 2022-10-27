const express = require('express')
const News = require('../models/news')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Public news')
})

module.exports = router
