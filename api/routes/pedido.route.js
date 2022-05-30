const express = require('express');
const router = express.Router();
const PedidoServices = require('../services/pedido.services')
const service = new PedidoServices
const validatorHandle = require('../middleware/validator.handle')
const { crearPedidoSchema, actualizarPedidoSchema, mostrarPedidoSchema } = require('../schemas/pedido.schema')

router.get('/',
    async (req, res, next) => {
        try {
            const pedidos = await service.mostrarTodo()
            res.status(200).json(pedidos)
        } catch (error) {
            next(error)
        }
    })

router.post('/',
    validatorHandle(crearPedidoSchema, 'body'),
    async (req, res, next) => {
        try {
            const info = req.body
            const newPedido = await service.crearPedido(info)
            res.status(201).json(newPedido)
        } catch (error) {
            next(error)
        }
    })

router.patch('/:id',
    validatorHandle(mostrarPedidoSchema, 'params'),
    validatorHandle(actualizarPedidoSchema, 'body'),
    async (req, res, next) => {
        try {
            const id = req.params
            const info = req.body
            const updatePedido = await service.actualizarPedido(id, info)
            res.status(200).json(updatePedido)
        } catch (error) {
            next(error)
        }
    })

router.delete('/:id',
    validatorHandle(mostrarPedidoSchema, 'params'),
    async (req, res, next) => {
        try {
            const id = req.params
            const deletePedido = await service.eliminarPedido(id)
            res.status(200).json(deletePedido)
        } catch (error) {
            next(error)
        }
    })

module.exports = router