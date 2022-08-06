const express = require('express')
const router = express.Router()

const {
    getLevels,
    getEditLevels,
    editLevel,
    addLevel,
    deleteLevel
} = require('../controllers/levelController')

router.get('/:title=:bgColor', getLevels)
router.get('/edit-levels', getEditLevels)
router.post('/edit-levels', addLevel)
router.put('/edit-levels:id', editLevel)
router.delete('/level:id', deleteLevel)

module.exports = router
