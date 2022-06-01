const joi = require('joi')

const id = joi.string().guid({
    version: [
        'uuidv4',
        'uuidv5'
    ]
})
const isbn = joi.string().min(10).max(13)
const titulo = joi.string()
const precio = joi.number().positive()
const autor = joi.string()
const editorial = joi.string()
const cantExistente = joi.number().integer()

const crearProductoSchema = joi.object({
    titulo: titulo.required(),
    precio: precio.required(),
    cantExistente: cantExistente.required(),
    autor,
    editorial,
    isbn
})

const actualizarProductoSchema = joi.object({
    titulo,
    precio,
    cantExistente
})

const mostrarProductoSchema = joi.object({
    id: id.required()
})

module.exports = { crearProductoSchema, actualizarProductoSchema, mostrarProductoSchema }