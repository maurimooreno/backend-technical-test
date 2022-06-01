# Prueba Tecnica Backend

Se planeo el desarrollo de una API Rest que pueda concectarse a un front client para un e-commerce, inicialmente esta pensado para productos de tipo libros, pero soporta otra variedad de productos, cuenta con la capacidad de manejar el inventario, vender, comprar, un carrito de compras, registrar usuarios, un perfil de usuarios y que los usuarios se puedan autenticar.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

```
Tener Node.js instalado
Tener Git instalado

```

### Instalación 🔧

_En consola o git bash._

```
git clone <repo>
npm i (para instalar dependencias)

```

## Despliegue 📦

_Es sumamente importante crear un archivo .env fuera de la carpeta api._

```
crear un archivo .env usando como referencia el archivo .env_example del repo

variables importantes:

JWT_SECRET=soyelsecretmasseguro123
API_KEY=soylaapikeymassegura123

npm run dev para correr el servidor

```
## Endpoints 🛠️

_Antes de utilizar los endpoints es necesario recordar que para acceder a tales rutas debes logearte y obtener un token de session para poder utilizarlas._
_Dicho token debe ir en el Bearer Token del header de cada request, a demas de la apiKey en el header bajo el siguiente formato key: "api", value: soylaapikeymassegura123._ 

*[Usuario](#usuario)
*[Producto](#producto)
*[Pedido](#pedido)
*[Carrito](#carrito)
*[OrdenCompra](#ordencompra)
*[Auth](#auth)

## Usuario

## GET /usuario/

### Entrega un array de objetos con todos los usuarios existentes

### Response
```javascript
[
    {
        "id": "3b4181c0-e08a-422a-aff7-483aa773dc68",
        "nombre": "mauri",
        "email": "mauri@gmail.com",
        "password": "$2b$12$.y/y8YZ2eNkN2rnx6Bhmgu/wYsFm4heArzgEX7S7NCRXPrCTneUPG",
        "direccion": null,
        "avatar": "",
        "CarritoId": "d9fb1fa4-c845-450c-b044-1d6e2a344a0e",
        "Carrito": {
            "id": "d9fb1fa4-c845-450c-b044-1d6e2a344a0e",
            "productos": null
        }
    }
 ]
```

## PATCH /usuario/:id

### Permite actualizar uno o todos los datos de un usuario (excepto ID)
### tales datos como nombre, password, email, direccion, avatar.
### Es necesario pasar por el path el ID del usuario y por body un objeto con la info para actualizar 

### Response
```javascript
  {
      "nombre": "mauri",
      "email": "mauri@gmail.com",
      "password": "$2b$12$.y/y8YZ2eNkN2rnx6Bhmgu/wYsFm4heArzgEX7S7NCRXPrCTneUPG",
      "direccion": null,
      "avatar": ""
      }
  }
```

## DELETE /usuario/:id

### Permite eliminar un usuario
### Es necesario pasar por el path el ID del usuario 

## Producto

## GET /producto/

### Entrega un array de objetos con todos los productos existentes

### Response
```javascript
[
    {
        "id": "453c9b72-d690-4667-9473-7bf5d853968e",
        "isbn": null,
        "titulo": "producto 3",
        "precio": "213",
        "autor": null,
        "editorial": null,
        "cantExistente": 0
    },
]
```

## POST /producto/

### Permite crear un nuevo producto
### Es necesario pasar por body un objeto con la informacion para crear el producto
### En este caso los datos son 

### Response
```javascript
{
    "titulo": "producto 1" (OBLIGATORIO),
    "precio": "213" (OBLIGATORIO),
    "cantExistente": 50 (OBLIGATORIO),
    "autor": "", (OPCIONAL)
    editorial: "", (OPCIONAL)
    isbn: "" (OPCIONAL)
}
```

## PATCH /producto/:id

### Permite actualizar la informacion de un producto
### Se necesita pasar por path el ID del producto y por body un objeto con la informacion para actualizar
### Los unicos datos que se pueden actualizar son:

### Response
```javascript
{
    "titulo": ""
    "precio": ""
    "cantExistente": 
}
```

## DELETE /producto/:id

### Permite eliminar un producto
### Es necesario pasar por el path el ID del producto 

## Pedido

## GET /pedido/

### Este endpoint devuelve dos posibles resultados: 
### En el caso de no enviar ningun parametro el enpoint
### Permite obtener un array de objetos con todos los pedidos existentes

### Response
```javascript
[
    {
        "id": "b5b4ee83-1b4f-4017-afa1-8e488e2f0fd5",
        "monto": "6390",
        "date": "2022-05-31",
        "UsuarioId": "35f0a6b9-6551-4a3d-a240-f73f40083615"
    },
    {
        "id": "d2b60d10-47a3-4d9f-a482-f7a5859da6a0",
        "monto": "23430",
        "date": "2022-05-31",
        "UsuarioId": "ddbe7977-041a-44a1-92ae-54c3c06902dd"
    },
]
```
### El otro caso es cuando enviamos por body un objeto con el ID del pedido
### Este caso devuelve informacion mas especifica de un pedido

### Response
```javascript
{
    "id": "d2b60d10-47a3-4d9f-a482-f7a5859da6a0",
    "monto": "23430",
    "date": "2022-05-31",
    "UsuarioId": "ddbe7977-041a-44a1-92ae-54c3c06902dd",
    "Productos": [
        {
            "id": "453c9b72-d690-4667-9473-7bf5d853968e",
            "isbn": null,
            "titulo": "producto 3",
            "precio": "213",
            "autor": null,
            "editorial": null,
            "cantExistente": 0
        },
    ]
}
```

## POST /pedido/

### Permite registrar un nuevo pedido para un usuario que tenga productos en su carrito de compras
### Para hacer uso de este endpoint es necesario pasar por body un objecto con el ID del usuario

### Request
```javascript
{
    "idUsuario": "ddbe7977-041a-44a1-92ae-54c3c06902dd"
}
```
### Response
```javascript
{
    "id": "083f6701-c589-4dda-bac0-58ba06b14b01",
    "date": "2022-06-01",
    "monto": "1065",
    "UsuarioId": "ddbe7977-041a-44a1-92ae-54c3c06902dd"
}
```

## Carrito

## GET /carrito/:id

### Permite obtener un objeto con los productos que contiene el carrito del usuario
### Es necesario pasar por path el ID del usuario

### Response
```javascript
{
    "id": "16171ca9-af14-4bf9-af0f-140ba3bab4c7",
    "productos": [
        {
            "idProducto": "367d1a31-7d35-4e15-a95f-e2ca9a97704f",
            "cantRequerida": 5
        }
    ]
}
```

## POST /carrito/:id

### Permite cargar el carrito de un usuario con los productos que desea
### Es necesario pasar por path el ID del usuario y por body un array de objetos
### Dicho array de objetos debe contener el id del producto y la cantidad que se desea

### Request
```javascript
[
    {
        "id": "367d1a31-7d35-4e15-a95f-e2ca9a97704f",
        "cantidad": 5
    }
]
```

### Response
```javascript
{
    "msg": "Producto cargado al carrito"
}
```

## OrdenCompra

## GET /ordenCompra/

### Permite obtener todas las ordenes de compra de insumos(productos) realizadas
### Retorna un array de objetos con informacion sobre dichas ordenes de compras

### Response
```javascript
[
    {
        "id": "a6b0fc3b-7e5b-4a6a-b6da-92e410dcdb21",
        "distribuidor": "santa rosa S.A",
        "cantProducto": 500,
        "producto": "Libros de segunda mano"
    }
]
```

## POST /ordenCompra/

### Permite registrar nuevas ordenes de compras de insumos
### Es necesario enviar por body un objeto con la informacion a guardar

### Request 
```javascript
{
    "distribuidor": "santa rosa S.A", (OBLIGATORIO)
    "cantProducto": 500, (OBLIGATORIO)
    "producto": "Libros de segunda mano" (OBLIGATORIO)
}
```
### Response
```javascript
{
    "id": "5f433fef-3f54-40dc-874e-bf7ffa3463ca",
    "distribuidor": "santa rosa S.A",
    "cantProducto": 500,
    "producto": "Libros de segunda mano"
}
```

## Auth

## POST /auth/login/

### Le permite a un usuario ya registrado logearse
### Es necesario enviar por body un objeto especificando el email y password

### Request
```javascript
{
    "email": "mauri@gmail.com",
    "password": "mauriM010"
}
```
### Response
### En este caso el response es un objeto que contiene un token de session que necesitara el usuario para acceder a los demas endpoints
```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNWYwYTZiOS02NTUxLTRhM2QtYTI0MC1mNzNmNDAwODM2MTUiLCJpYXQiOjE2NTQwNTc3Mzh9.Zr0fDr9OKWzyx7xaC-8Q7MeizJVUFDHA135LcB_sBMg"
}
```

## POTS /auth/signup/

### Permite el registro de un nuevo usuario
### Es necesario pasar por body un objeto con el email, password y nombre

### Request
```javascript
{
    "nombre": "mauri",
    "email": "mauri@gmail.com",
    "password": "asdasd123"
}
```
### Response 
```javascript
{
    "success": true,
    "msg": "Usuario creado con éxito"
}
```

## Construido con 🛠️

* [Node js] (https://nodejs.org/es/)
* [Express js] (https://expressjs.com/es/)
* [Postgres] (https://www.postgresql.org/)
* [Sequelize] (https://sequelize.org/)
* [Passport js] (https://www.passportjs.org/)
* [JWT] (https://jwt.io/)
* [JOI] (https://joi.dev/api/?v=17.6.0)
* [Bcrypt] (https://www.npmjs.com/package/bcrypt)

## Sobre la seguridad ⚙️

### La API tiene implementado el middleware de Passport, utilizando sus estrategias de passport-local para la autenticacion de usuarios para el login y passport-jwt para la autorizacion de acceso a endpoints con un token de session, el cual, en una version futura manejar el acceso por roles de usuario no seria ningun inconveniente.
### A demas la API cuenta con la implementacion de una API_KEY personalizada para darle mas seguridad
### Para finalizar, el sistema presenta CORS que si bien en este momento no tiene definido un dominio especifico al cual le de acceso especificamente, la configuracion del archivo index.js cuenta con una whitelist para agregarle el dominio del front client una ves que se conozca.

## Autores ✒️

* **Moreno Mauricio** - *Trabajo Inicial* - *Documentacion* -[mauriciomooreno](https://www.linkedin.com/in/mauriciomooreno/)
