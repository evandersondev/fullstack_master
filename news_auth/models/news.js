const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
})

const News = mongoose.model('News', NewsSchema)

module.exports = News
