const express = require('express');
const routerApi = require('./routes')
const cors = require('cors');
const { config } = require('./config/config');
const sequelize = require('./libs/sequelize');
const { errorHandle, boomErrorHandle } = require('./middleware/error.handle');

const app = express();
const port = config.port || "3001";

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
require('./utils/auth');

routerApi(app);

//Manejo de errores con middleware
app.use(errorHandle);
app.use(boomErrorHandle);

app.listen(port, ()=>{
    console.log('prepared to work in the port ' + port)
})
