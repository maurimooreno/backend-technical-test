const boom = require('@hapi/boom');
const { Categoria } = require('../db/models/categorias.model')

class CategoriaServices {

    async mostrarTodo() {
        const categorias = await Categoria.findAll()
        if (!categorias) return { msg: "No existen categorias registrados" }
        return categorias
    }

    async crearCategoria(info) {
        const newCategoria = await Categoria.create(info)
        return newCategoria.toJSON()
    }

    async actualizarCategoria(id, info) {
        const updateCategoria = await Categoria.findByPk(id)
        if (!updateCategoria) return boom.notFound("No existe ningun categoria con ese ID")
        updateCategoria.update(info)
        return updateCategoria
    }

    async eliminarCategoria(id) {
        const findCategoria = await Categoria.findByPk(id)
        if (!findCategoria) return boom.notFound("No existe ningun categoria con ese ID")
        await findCategoria.destroy()
        return {msg: "Categoria eliminado con exito"}
    }

}

module.exports = CategoriaServices