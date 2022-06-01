const express = require('express');
const passport = require('passport')
const router = express.Router();
const CarritoServices = require('../services/carrito.services')
const { checkApiKey } = require('../middleware/auth.handle')
const { mostrarCarritoSchema } = require('../schemas/carrito.schema')
const validatorHandle = require('../middleware/validator.handle')
const service = new CarritoServices

router.get('/:id',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    validatorHandle(mostrarCarritoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const carritos = await service.mostarCarrito(id)
            res.status(200).json(carritos)
        } catch (error) {
            next(error)
        }
    }
)

router.post('/:id',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const info = req.body
            const carrito = await service.cargarCarrito(id, info)
            res.status(201).json(carrito)
        } catch (error) {
            next(error)
        }
    }
)


module.exports = router