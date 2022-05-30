const express = require('express');
const router = express.Router();
const CategoriaServices = require('../services/categoria.services')
const service = new CategoriaServices

router.get('/', async (req, res, next) => {
    try {
        const categorias = await service.mostrarTodo()
        res.status(200).json(categorias)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const info = req.body
        const newCategoria = await service.crearCategoria(info)
        res.status(201).json(newCategoria)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params
        const info = req.body
        const updateCategoria = await service.actualizarCategoria(id, info)
        res.status(200).json(updateCategoria)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params
        const deleteCategoria = await service.eliminarCategoria(id)
        res.status(200).json(deleteCategoria)
    } catch (error) {
        next(error)
    }
})

module.exports = router