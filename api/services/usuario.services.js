const boom = require('@hapi/boom');
const { Usuario } = require('../db/models/usuarios.model')

class UsuarioServices {

    async mostrarTodo() {
        const usuarios = await Usuario.findAll()
        if (!usuarios) return { msg: "No existen usuarios registrados" }
        return usuarios
    }

    async crearUsuario(info) {
        const newUsuario = await Usuario.create(info)
        return newUsuario.toJSON()
    }

    async actualizarUsuario(id, info) {
        const updateUsuario = await Usuario.findByPk(id)
        if (!updateUsuario) return boom.notFound("No existe ningun usuario con ese ID")
        updateUsuario.update(info)
        return updateUsuario
    }

    async eliminarUsuario(id) {
        const findUsuario = await Usuario.findByPk(id)
        if (!findUsuario) return boom.notFound("No existe ningun usuario con ese ID")
        await findUsuario.destroy()
        return {msg: "Usuario eliminado con exito"}
    }

}

module.exports = UsuarioServices