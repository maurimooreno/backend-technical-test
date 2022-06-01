const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index')
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}` /* local */

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false
});

setupModels(sequelize);

//Importar modelos en caso de relaciones
const { Usuario, Pedido, Producto, Carrito } = sequelize.models;

//Relacion many to many Producto/Pedido
Pedido.belongsToMany(Producto, {through: "detalle_pedido"})
Producto.belongsToMany(Pedido, {through: "detalle_pedido"})

//Relacion one to one Usuario/Carrito
Carrito.hasOne(Usuario)
Usuario.belongsTo(Carrito)

//Relacion one to many Usuario/Pedido
Usuario.hasMany(Pedido)
Pedido.belongsTo(Usuario)


sequelize.sync({ force: false })
  .then(() => {
    console.log(`created/updated database`); 
  })
  .catch(err => console.log(err));

module.exports = sequelize