const joi = require('joi')

const distribuidor = joi.string()
const cantProducto = joi.number().integer().positive()
const producto = joi.string()

const crearOrdenCompraSchema = joi.object({
    distribuidor: distribuidor.required(),
    cantProducto: cantProducto.required(),
    producto: producto.required()
})

module.exports = { crearOrdenCompraSchema }