const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const methodeOverride = require('methode-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodeOverride('_methode'))

app.get('/', async (req, res) => {
    const artices = await Articles.find().sort({ createdAt: 'desc' })
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(5000)