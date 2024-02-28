const { Schema, model } = require('mongoose')

const ServiceSchema = new Schema({
    service : {type: String, required: true},
    description : {type: String, required: true},
    price : {type: String, required: true},
    provider : {type: String, required: true},
}, {versionKey: false, timestamps: true})

const ServiceModel = new model('services', ServiceSchema)
module.exports = ServiceModel




