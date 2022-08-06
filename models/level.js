const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')
const Schema = mongoose.Schema

const levelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    btnText: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
    }
}, { collection: 'levels' })

const Level = mongoose.model('Level', levelSchema)
module.exports = Level