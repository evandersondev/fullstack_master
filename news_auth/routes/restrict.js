const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Restrict')
})

router.get('/news', (req, res) => {
  res.send('Restricted news')
})

module.exports = router
