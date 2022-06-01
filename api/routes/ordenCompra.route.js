const express = require('express');
const passport = require('passport')
const router = express.Router();
const { crearOrdenCompraSchema } = require('../schemas/ordenCompra.schema')
const validatorHandle = require('../middleware/validator.handle')
const { checkApiKey } = require('../middleware/auth.handle');
const OrdenCompraServices = require('../services/ordenCompra.services')
const service = new OrdenCompraServices

router.get('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            const ordenCompras = await service.mostrarTodo()
            res.status(200).json(ordenCompras)
        } catch (error) {
            next(error)
        }
    }
)

router.post('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    validatorHandle(crearOrdenCompraSchema),
    async (req, res, next) => {
        try {
            const info = req.body
            const newOrdenCompra = await service.crearOrdenCompra(info)
            res.status(201).json(newOrdenCompra)
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router