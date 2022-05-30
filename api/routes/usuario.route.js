const express = require('express');
const router = express.Router();
const UsuarioServices = require('../services/usuario.services')
const service = new UsuarioServices
const validatorHandle = require('../middleware/validator.handle')
const { crearUsuarioSchema, actualizarUsuarioSchema, mostrarUsuarioSchema } = require('../schemas/usuario.schema')

router.get('/',
    async (req, res, next) => {
        try {
            const usuarios = await service.mostrarTodo()
            res.status(200).json(usuarios)
        } catch (error) {
            next(error)
        }
    })

router.post('/',
    validatorHandle(crearUsuarioSchema, 'body'),
    async (req, res, next) => {
        try {
            const info = req.body
            const newUsuario = await service.crearUsuario(info)
            res.status(201).json(newUsuario)
        } catch (error) {
            next(error)
        }
    })

router.patch('/:id',
    validatorHandle(mostrarUsuarioSchema, 'params'),
    validatorHandle(actualizarUsuarioSchema, 'body'),
    async (req, res, next) => {
        try {
            const id = req.params
            const info = req.body
            const updateUsuario = await service.actualizarUsuario(id, info)
            res.status(200).json(updateUsuario)
        } catch (error) {
            next(error)
        }
    })

router.delete('/:id',
    validatorHandle(mostrarUsuarioSchema, 'params'),
    async (req, res, next) => {
        try {
            const id = req.params
            const deleteUsuario = await service.eliminarUsuario(id)
            res.status(200).json(deleteUsuario)
        } catch (error) {
            next(error)
        }
    })

module.exports = router