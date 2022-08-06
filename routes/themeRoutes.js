const express = require('express')
const router = express.Router()

const {
    getThemes,
    getAdminPanel,
    getEditThemes,
    addTheme,
    editTheme,
    deleteTheme
} = require('../controllers/themeController')

router.get('/', getThemes)
router.get('/admin-panel', getAdminPanel)
router.get('/edit-themes', getEditThemes)
router.post('/edit-themes', addTheme)
router.put('/edit-themes:id', editTheme)
router.delete('/theme:id', deleteTheme)

module.exports = router

