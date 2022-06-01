const joi = require('joi')

const idUsuario = joi.string().guid({
    version: [
        'uuidv4',
        'uuidv5'
    ]
})

const crearPedidoSchema = joi.object({
    idUsuario: idUsuario.required()
})

module.exports = { crearPedidoSchema }