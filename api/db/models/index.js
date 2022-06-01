const { Usuario, UsuarioSchema } = require('./usuarios.model')
const { Pedido, PedidoSchema } = require('./pedidos.model')
const { Producto, ProductoSchema } = require('./productos.model')
const { Carrito, CarritoSchema } = require('./carrito.model')
const { OrdenCompra, OrdenCompraSchema} = require('./ordenCompra.model')

function setupModels(sequelize) {
    Usuario.init(UsuarioSchema, Usuario.config(sequelize))
    Pedido.init(PedidoSchema, Pedido.config(sequelize))
    Producto.init(ProductoSchema, Producto.config(sequelize))
    Carrito.init(CarritoSchema, Carrito.config(sequelize))
    OrdenCompra.init(OrdenCompraSchema, OrdenCompra.config(sequelize))
}

module.exports = setupModels;