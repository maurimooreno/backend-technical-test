const boom = require('@hapi/boom');
const { Carrito } = require('../db/models/carrito.model');
const { Producto } = require('../db/models/productos.model');
const { Usuario } = require('../db/models/usuarios.model');

class CarritoServices {

    async mostarCarrito(id) {
        const usuario = await Usuario.findOne({ where: { id: id }, include: [Carrito] })
        if (!usuario) return boom.notFound("No existe ningun usuario con ese ID")
        let carrito = null
        if (!usuario.CarritoId) {
            carrito = await Carrito.create()
            usuario.setCarrito(carrito)
        } else {
            carrito = await Carrito.findOne({ where: { id: usuario.CarritoId } })
        }
        if (carrito === null) return { msg: "El carrito se encuentra vacio" }
        return carrito
    }


    async cargarCarrito(id, info) {
        let carrito = null;
        const usuario = await Usuario.findOne({ where: { id: id }, include: [Carrito] })
        if (!usuario) return boom.notFound("No existe ningun usuario con ese ID")
        if (usuario.CarritoId === null) {
            carrito = await Carrito.create()
            usuario.setCarrito(carrito)
        } else {
            carrito = await Carrito.findOne({ where: { id: usuario.CarritoId } })
        }
        let infoProducto = null
        for (let i = 0; i < info.length; i++) {
            const producto = await Producto.findOne({ where: { id: info[i].id } })
            if (!producto) return boom.notFound("No existe ningun producto con ese ID")
            if (producto.cantExistente < info[i].cantidad) return boom.badData("La cantidad existente de este producto es menor a la cantidad que solicitas")
        }
        for (let i = 0; i < info.length; i++) {
            if (!carrito.productos) {
                infoProducto = [
                    {
                        idProducto: info[i].id,
                        cantRequerida: info[i].cantidad
                    }
                ]
                carrito.update({ productos: infoProducto })
                continue;
            }
            if (carrito.productos.length > 0) {
                infoProducto = [
                    ...carrito.productos,
                    {
                        idProducto: info[i].id,
                        cantRequerida: info[i].cantidad
                    }
                ]
                carrito.update({ productos: infoProducto })
            }
        }
        
        let carritoFilter = carrito.productos.reduce((acc, curr) => {
            // Buscar elemento en arreglo y obtener posición
            let found = acc.findIndex(existe => existe.idProducto == curr.idProducto);
            if(found < 0) {
                // No existe todavía en el arreglo
                acc.push({idProducto:curr.idProducto, cantRequerida: curr.cantRequerida});
            } else {
                // Sí existe, incrementar
                acc[found].cantRequerida += curr.cantRequerida;
            }
            return acc;
        }, []);
        
        carrito.update({productos: carritoFilter})

        return { msg: "Producto cargado al carrito" }
    }
}

module.exports = CarritoServices