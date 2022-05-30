const boom = require('@hapi/boom');
const { Producto } = require('../db/models/productos.model')

class ProductoServices {

    async mostrarTodo() {
        const productos = await Producto.findAll()
        if (!productos) return { msg: "No existen productos registrados" }
        return productos
    }

    async crearProducto(info) {
        const newProducto = await Producto.create(info)
        return newProducto.toJSON()
    }

    async actualizarProducto(id, info) {
        const updateProducto = await Producto.findByPk(id)
        if (!updateProducto) return boom.notFound("No existe ningun producto con ese ID")
        updateProducto.update(info)
        return updateProducto
    }

    async eliminarProducto(id) {
        const findProducto = await Producto.findByPk(id)
        if (!findProducto) return boom.notFound("No existe ningun producto con ese ID")
        await findProducto.destroy()
        return {msg: "Producto eliminado con exito"}
    }

}

module.exports = ProductoServices