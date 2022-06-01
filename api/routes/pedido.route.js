const express = require('express');
const passport = require('passport')
const router = express.Router();
const PedidoServices = require('../services/pedido.services')
const service = new PedidoServices
const validatorHandle = require('../middleware/validator.handle')
const { checkApiKey } = require('../middleware/auth.handle');
const { crearPedidoSchema } = require('../schemas/pedido.schema')

router.get('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            const { id } = req.body
            if (id) {
                const pedido = await service.mostrarPedido(id)
                res.status(200).json(pedido)
            } else {
                const pedidos = await service.mostrarTodoPedidos()
                res.status(200).json(pedidos)
            }
        } catch (error) {
            next(error)
        }
    }
)


router.post('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    validatorHandle(crearPedidoSchema, 'body'),
    async (req, res, next) => {
        try {
            const info = req.body
            const newPedido = await service.crearPedido(info)
            res.status(201).json(newPedido)
        } catch (error) {
            next(error)
        }
    }
)

router.patch('/:id',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            const id = req.params
            const info = req.body
            const updatePedido = await service.actualizarPedido(id, info)
            res.status(200).json(updatePedido)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router