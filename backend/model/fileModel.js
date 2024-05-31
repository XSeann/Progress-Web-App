const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FileSchema = new Schema({
    task : {
        type: Object,
        required: true
    },
    owner : {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('progressWebAppV3Files', FileSchema)