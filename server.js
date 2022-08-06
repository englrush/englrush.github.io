const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const themeRoutes = require('./routes/themeRoutes')
const levelRoutes = require('./routes/levelRoutes')
require('dotenv').config()

const app = express()

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))

mongoose
    .connect(process.env.MongoURL)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e))

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/error', (req, res) => {
    const title = "Error"
    res
        .status(400)
        .render('error', { title })
})

app.use(themeRoutes)

app.use(levelRoutes)


