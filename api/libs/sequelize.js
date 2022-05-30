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
// const {} = sequelize.models;


sequelize.sync({ force: false })
  .then(() => {
    console.log(`created/updated database`); 
  })
  .catch(err => console.log(err));

module.exports = sequelize