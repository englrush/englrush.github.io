const Theme = require('../models/theme')

const getThemes = (req, res) => {
    const title = "Englrush"
    Theme
        .find()
        .then((parts) => res.render('index', { parts, title }))
        .catch((e) => res.send(e))
}

const getAdminPanel = (req, res) => {
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
}

const getEditThemes = (req, res) => {
    const title = "Themes"
    const colors = ['#112639', '#F6008F', '#31DF01', '#39A0ED']
    Theme
        .find()
        .then((part) => res.render('edit-part', { part, colors, title }))
        .catch((e) => res.send(e))
}

const addTheme = (req, res) => {
    const { title, description, btnText, bgColor } = req.body
    const theme = new Theme({ title, description, bgColor, btnText })
    theme
        .save()
        .then(() => res.redirect('/edit-themes'))
        .catch((e) => res.send(e))
}

const editTheme = (req, res) => {
    const { title, description, bgColor, btnText } = req.body
    const { id } = req.params
    Theme
        .findByIdAndUpdate(id, { title, description, bgColor, btnText })
        .then(() => res.redirect('/edit-themes'))
        .catch((e) => res.send(e))
}

const deleteTheme = (req, res) => {
    Theme
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((e) => res.send(e))

}

module.exports = {
    getThemes,
    getAdminPanel,
    getEditThemes,
    addTheme,
    editTheme,
    deleteTheme
}