const boom = require('@hapi/boom');
const { Carrito } = require('../db/models/carrito.model');
const { Pedido } = require('../db/models/pedidos.model');
const { Producto } = require('../db/models/productos.model');
const { Usuario } = require('../db/models/usuarios.model');
const ProductoServices = require('../services/producto.services')
const productoService = new ProductoServices

class PedidoServices {

    async mostrarPedido(id) {
        const pedidos = await Pedido.findOne({ where: { id: id }, include: [Producto] })
        if (!pedidos) return { msg: "No existen un pedido con ese ID" }
        return pedidos
    }

    async mostrarTodoPedidos(){
        const pedidos = await Pedido.findAll()
        if (!pedidos) return { msg: "No existen pedidos registrados para este usuario" }
        return pedidos
    }

    async crearPedido(info) {
        const { idUsuario } = info
        const usuario = await Usuario.findOne({ where: { id: idUsuario }, include: [Carrito] })
        if (!usuario) return boom.notFound('No existe un usuario con ese ID')
        if (!usuario.Carrito) return boom.badData('Carga un producto en tu carrito para poder comprar')
        let monto = 0
        for (let i = 0; i < usuario.Carrito.productos.length; i++) {
            const producto = await Producto.findOne({ where: { id: usuario.Carrito.productos[i].idProducto } })
            monto += producto.precio * usuario.Carrito.productos[i].cantRequerida
        }
        const newPedido = await Pedido.create({ monto: monto })
        for (let i = 0; i < usuario.Carrito.productos.length; i++) {
            const producto = await Producto.findOne({ where: { id: usuario.Carrito.productos[i].idProducto } })
            if (producto.cantExistente < usuario.Carrito.productos[i].cantRequerida) {
                newPedido.destroy()
                return boom.badData("La cantidad de productos existente es menor a la que deseas comprar")
            }
            const actualizarProducto = {
                cantExistente: (producto.cantExistente - usuario.Carrito.productos[i].cantRequerida)
            }
            productoService.actualizarProducto(usuario.Carrito.productos[i].idProducto, actualizarProducto)
            newPedido.addProducto(producto)
        }
        newPedido.setUsuario(usuario)
        const carrito = await Carrito.findOne({ where: { id: usuario.CarritoId } })
        await carrito.destroy()
        return newPedido.toJSON()
    }

}

module.exports = PedidoServices