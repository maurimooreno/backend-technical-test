const boom = require('@hapi/boom');
const { Carrito } = require('../db/models/carrito.model');
const { Producto } = require('../db/models/productos.model');
const { Usuario } = require('../db/models/usuarios.model');

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
        const idProdu = id
        const updateProducto = await Producto.findOne({where: {id: idProdu}})
        if (!updateProducto) return boom.notFound("No existe ningun producto con ese ID")
        updateProducto.update(info)
        return updateProducto
    }

    async eliminarProducto(id) {
        const findProducto = await Producto.findOne({where: {id: id}})
        if (!findProducto) return boom.notFound("No existe ningun producto con ese ID")
        await findProducto.destroy()
        return {msg: "Producto eliminado con exito"}
    }
}

module.exports = ProductoServices