const express = require('express');
const routerApi = require('./routes')
const cors = require('cors');
const { config } = require('./config/config');
const sequelize = require('./libs/sequelize');
const { errorHandler, boomErrorHandler } = require('./middleware/error.handler');

const app = express();
const port = config.port || 3001;

app.use(express.json());
 
//Aplicar la whitelist cuando ya se conozca el dominio del cliente
const whitelist = ['']
const option = {
  origin: (origin, callback)=>{
    if (whitelist.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('origin not allowed - CORS -'));
    }
  }
}
app.use(cors()); // en este momento esta dejando pasar todo 

routerApi(app);

//Manejo de errores con middleware
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, ()=>{
    console.log('prepared to work in the port ' + port)
})
