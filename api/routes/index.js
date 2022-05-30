const pedidoRouter = require('./pedido.route')
const productoRouter = require('./producto.route')
const categoriaRouter = require('./categoria.rotue')
const usuarioRouter = require('./usuario.route')

function routerApi (app) {
  app.use('/usuario', usuarioRouter);
  app.use('/pedido', pedidoRouter);
  app.use('/categoria', categoriaRouter);
  app.use('/producto', productoRouter);
}

module.exports = routerApi;