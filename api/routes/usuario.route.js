const express = require('express');
const passport = require('passport')
const router = express.Router();
const UsuarioServices = require('../services/usuario.services')
const service = new UsuarioServices
const validatorHandle = require('../middleware/validator.handle')
const { checkApiKey } = require('../middleware/auth.handle');
const { actualizarUsuarioSchema, mostrarUsuarioSchema } = require('../schemas/usuario.schema')

router.get('/',
    checkApiKey,
    async (req, res, next) => {
        try {
            const usuarios = await service.mostrarTodo()
            res.status(200).json(usuarios)
        } catch (error) {
            next(error)
        }
    })

router.patch('/:id',
    checkApiKey,
    passport.authenticate('jwt', { session: false }),
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
    checkApiKey,
    passport.authenticate('jwt', { session: false }),
    validatorHandle(mostrarUsuarioSchema, 'params'),
    async (req, res, next) => {
        try {
            const id = req.params
            const deleteUsuario = await service.eliminarUsuario(id)
            res.status(200).json(deleteUsuario)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router