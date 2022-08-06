const mongoose = require('mongoose')
const Schema = mongoose.Schema

const themeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        required: true
    },
    btnText:{
        type: String,
        required: true
    }
}, { collection: 'themes' })

const Theme = mongoose.model('Theme', themeSchema)
module.exports = Theme