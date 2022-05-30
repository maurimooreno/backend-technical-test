const joi = require('joi')

const id = joi.string().guid({
    version: [
        'uuidv4',
        'uuidv5'
    ]
})
const distribuidor = joi.string()
const cantProducto = joi.number().integer()

const crearPedidoSchema = joi.object({
    distribuidor: distribuidor.required(),
    cantProducto: cantProducto.required()
})

const actualizarPedidoSchema = joi.object({
    distribuidor,
    cantProducto
})

const mostrarPedidoSchema = joi.object({
    id: id.required()
})

module.exports = { crearPedidoSchema, actualizarPedidoSchema, mostrarPedidoSchema }