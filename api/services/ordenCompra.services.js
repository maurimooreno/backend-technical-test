const boom = require('@hapi/boom');
const { OrdenCompra } = require('../db/models/ordenCompra.model')

class OrdenCompraServices {

    async mostrarTodo() {
        const ordenCompras = await OrdenCompra.findAll()
        if (!ordenCompras) return { msg: "No existen ordenes de compras registradas" }
        return ordenCompras
    }

    async crearOrdenCompra(info) {
        const {distribuidor, cantProducto, producto} = info
        const newOrdenCompra = await OrdenCompra.create({distribuidor, cantProducto, producto})
        return newOrdenCompra.toJSON()
    }
}

module.exports = OrdenCompraServices