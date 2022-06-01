const joi = require('joi')

const id = joi.string().guid({
    version: [
        'uuidv4',
        'uuidv5'
    ]
})
const nombre = joi.string().min(2).max(30)
const password = joi.string().min(8).max(15)
const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: false} })
const direccion = joi.string().min(2).max(40)
const avatar = joi.string()

const crearUsuarioSchema = joi.object({
    nombre: nombre.required(),
    password: password.required(),
    email: email.required()
})

const actualizarUsuarioSchema = joi.object({
    nombre,
    password,
    email,
    direccion,
    avatar
})

const mostrarUsuarioSchema = joi.object({
    id: id.required()
})

module.exports = {crearUsuarioSchema, actualizarUsuarioSchema, mostrarUsuarioSchema}