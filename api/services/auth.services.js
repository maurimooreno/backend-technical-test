const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const UsuarioServices = require('./usuario.services');
const service = new UsuarioServices;

class AuthServices {

    async traerUsuario(email, password) {
        const usuario = await service.buscarPorEmail(email);
        if (!usuario) {
            return boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return boom.unauthorized();
        }
        delete usuario.dataValues.password;
        return usuario
    }


    async firmarToken(usuario) {
        const payload = {
            sub: usuario.id
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return ({
            token
        });
    }
}


module.exports = AuthServices;