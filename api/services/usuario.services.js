const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { Carrito } = require('../db/models/carrito.model');
const { Usuario } = require('../db/models/usuarios.model')

class UsuarioServices {

    async mostrarTodo() {
        const usuarios = await Usuario.findAll({include: [Carrito]})
        if (!usuarios) return { msg: "No existen usuarios registrados" }
        return usuarios
    }

    async actualizarUsuario(id, info) {
        let data = info
        const updateUsuario = await Usuario.findOne({where: {id: id}})
        if (!updateUsuario) return boom.notFound("No existe ningun usuario con ese ID")
        if(data.password){
            data.password = await bcrypt.hash(data.password, 12)
        }
        updateUsuario.update(info)
        return updateUsuario
    }

    async eliminarUsuario(id) {
        const findUsuario = await Usuario.findOne({where: {id: id}})
        if (!findUsuario) return boom.notFound("No existe ningun usuario con ese ID")
        await findUsuario.destroy()
        return { msg: "Usuario eliminado con exito" }
    }

    async buscarPorEmail(email) {
        const usuarios = await Usuario.findOne({
            where: {
                email
            }
        })
        return usuarios;
    }

}

module.exports = UsuarioServices