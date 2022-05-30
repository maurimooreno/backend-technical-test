const boom = require('@hapi/boom');
const { Pedido } = require('../db/models/pedidos.model')

class PedidoServices {

    async mostrarTodo() {
        const pedidos = await Pedido.findAll()
        if (!pedidos) return { msg: "No existen pedidos registrados" }
        return pedidos
    }

    async crearPedido(info) {
        const newPedido = await Pedido.create(info)
        return newPedido.toJSON()
    }

    async actualizarPedido(id, info) {
        const updatePedido = await Pedido.findByPk(id)
        if (!updatePedido) return boom.notFound("No existe ningun pedido con ese ID")
        updatePedido.update(info)
        return updatePedido
    }

    async eliminarPedido(id) {
        const findPedido = await Pedido.findByPk(id)
        if (!findPedido) return boom.notFound("No existe ningun pedido con ese ID")
        await findPedido.destroy()
        return {msg: "Pedido eliminado con exito"}
    }

}

module.exports = PedidoServices