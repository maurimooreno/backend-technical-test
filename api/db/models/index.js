const { Usuario, UsuarioSchema } = require('./usuarios.model')
const { Pedido, PedidoSchema } = require('./pedidos.model')
const { Producto, ProductoSchema } = require('./productos.model')
const { Categoria, CategoriaSchema } = require('./categorias.model')

function setupModels(sequelize) {
    Usuario.init(UsuarioSchema, Usuario.config(sequelize))
    Pedido.init(PedidoSchema, Pedido.config(sequelize))
    Producto.init(ProductoSchema, Producto.config(sequelize)),
    Categoria.init(CategoriaSchema, Categoria.config(sequelize))
}

module.exports = setupModels;