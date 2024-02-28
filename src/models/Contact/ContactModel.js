const { Schema, model } = require('mongoose')


const ContactSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true}
}, {versionKey: false, timestamps: true})

const ContactModel = new model('contacts', ContactSchema)
module.exports = ContactModel
