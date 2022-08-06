const Level = require('../models/level')

const getLevels = (req, res) => {
    const title = req.params.title
    const color = req.params.bgColor
    Level
        .find()
        .then((levels) => {
            let parts = []
            levels.forEach(({ title, description, btnText, bgColor }) => {
                bgColor = "#" + color
                const level = new Level({ title, description, btnText, bgColor })
                parts.push(level)
            })
            res.render('index', { parts, title })
        })
        .catch((e) => res.redirect('/error'))
}

const getEditLevels = (req, res) => {
    const title = "Levels"
    const colors = ['#112639']
    Level
        .find()
        .then((part) => res.render('edit-part', { part, colors, title }))
        .catch((e) => res.send(e))
}

const addLevel = (req, res) => {
    const { title, description, btnText, bgColor } = req.body
    const level = new Level({ title, description, btnText, bgColor })
    level
        .save()
        .then(() => res.redirect('/edit-levels'))
        .catch((e) => res.send(e))
}

const editLevel = (req, res) => {
    const { title, description, bgColor, btnText } = req.body
    const { id } = req.params
    Level
        .findByIdAndUpdate(id, { title, description, bgColor, btnText })
        .then(() => res.redirect('/edit-levels'))
        .catch((e) => res.send(e))
}

const deleteLevel = (req, res) => {
    Level
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((e) => res.send(e))
}

module.exports = {
    getLevels,
    getEditLevels,
    editLevel,
    addLevel,
    deleteLevel
}