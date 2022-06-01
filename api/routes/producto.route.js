const express = require('express');
const passport = require('passport')
const router = express.Router();
const ProductoServices = require('../services/producto.services')
const validatorHandle = require('../middleware/validator.handle')
const { checkApiKey } = require('../middleware/auth.handle')
const { crearProductoSchema, actualizarProductoSchema, mostrarProductoSchema } = require('../schemas/producto.schema')
const service = new ProductoServices

router.get('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            const productos = await service.mostrarTodo()
            res.status(200).json(productos)
        } catch (error) {
            next(error)
        }
    }
)

router.post('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    validatorHandle(crearProductoSchema, 'body'),
    async (req, res, next) => {
        try {
            const info = req.body
            const newProducto = await service.crearProducto(info)
            res.status(201).json(newProducto)
        } catch (error) {
            next(error)
        }
    }
)

router.patch('/:id',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    validatorHandle(mostrarProductoSchema, 'params'),
    validatorHandle(actualizarProductoSchema, 'body'),
    async (req, res, next) => {
        try {
            const {id} = req.params
            const info = req.body
            const updateProducto = await service.actualizarProducto(id, info)
            res.status(200).json(updateProducto)
        } catch (error) {
            next(error)
        }
    }
)

router.delete('/:id',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    validatorHandle(mostrarProductoSchema, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params
            const deleteProducto = await service.eliminarProducto(id)
            res.status(200).json(deleteProducto)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router