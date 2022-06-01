const joi = require('joi')

const id = joi.string().guid({
    version: [
        'uuidv4',
        'uuidv5'
    ]
})

const mostrarCarritoSchema = joi.object({
    id: id.required()
})

module.exports = { mostrarCarritoSchema }