const pedidoRouter = require('./pedido.route')
const productoRouter = require('./producto.route')
const usuarioRouter = require('./usuario.route')
const authRouter = require('./auth.route')
const carritoRouter = require('./carrito.route')
const ordenCompraRouter = require('./ordenCompra.route')

function routerApi (app) {
  app.use('/usuario', usuarioRouter);
  app.use('/pedido', pedidoRouter);
  app.use('/producto', productoRouter);
  app.use('/auth', authRouter)
  app.use('/carrito', carritoRouter)
  app.use('/ordenCompra', ordenCompraRouter)
}

module.exports = routerApi;