const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Theme = require('./models/theme')
const Level = require('./models/level')
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

app.get('/', (req, res) => {
    const title = "Englrush"
    Theme
        .find()
        .then((parts) => res.render('index', { parts, title }))
        .catch((e) => res.send(e))
})

app.get('/admin-panel', (req, res) => {
    const title = "Admin Panel"
    const panels = ['Themes', 'Levels']
    let panelColors = ['#112639', '#112639']
    Theme
        .find()
        .then(themes => {
            themes.forEach(({ title, bgColor }) => {
                panels.push(title)
                panelColors.push(bgColor)
            })
            res.render('admin-panel', { title, panels, panelColors })
        })
        .catch((e) => res.send(e))

})

app.get('/edit-themes', (req, res) => {
    const title = "Themes"
    const colors = ['#112639', '#F6008F', '#31DF01', '#39A0ED']
    Theme
        .find()
        .then((part) => res.render('edit-part', { part, colors, title }))
        .catch((e) => res.send(e))
})

app.get('/edit-levels', (req, res) => {
    const title = "Levels"
    const colors = ['#112639']
    Level
        .find()
        .then((part) => res.render('edit-part', { part, colors, title }))
        .catch((e) => res.send(e))
})

app.get('/:title', (req, res) => {
    const title = req.params.title
    Theme
        .findOne({ title: title })
        .then(theme => {
            Level
                .find()
                .then((levels) => {
                    let parts = []
                    levels.forEach(({ title, description, btnText, bgColor }) => {
                        bgColor = theme.bgColor
                        const level = new Level({ title, description, btnText, bgColor })
                        parts.push(level)
                    })
                    res.render('index', { parts, title })
                })
                .catch((e) => res.send(e))
        })
        .catch((e) => res.send(e))
})

app.put('/edit-themes:id', (req, res) => {
    const { title, description, bgColor, btnText } = req.body
    const { id } = req.params
    Theme
        .findByIdAndUpdate(id, { title, description, bgColor, btnText })
        .then(() => res.redirect('/edit-themes'))
        .catch((e) => res.send(e))
})

app.put('/edit-levels:id', (req, res) => {
    const { title, description, bgColor, btnText } = req.body
    const { id } = req.params
    Level
        .findByIdAndUpdate(id, { title, description, bgColor, btnText })
        .then(() => res.redirect('/edit-levels'))
        .catch((e) => res.send(e))
})

app.post('/edit-themes', (req, res) => {
    const { title, description, btnText, bgColor } = req.body
    const theme = new Theme({ title, description, bgColor, btnText })
    theme
        .save()
        .then(() => res.redirect('/edit-themes'))
        .catch((e) => res.send(e))
})

app.post('/edit-levels', (req, res) => {
    const { title, description, btnText, bgColor } = req.body
    const level = new Level({ title, description, btnText, bgColor })
    level
        .save()
        .then(() => res.redirect('/edit-levels'))
        .catch((e) => res.send(e))
})

app.delete('/theme:id', (req, res) => {
    Theme
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((e) => res.send(e))

})

app.delete('/level:id', (req, res) => {
    Level
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((e) => res.send(e))
})

