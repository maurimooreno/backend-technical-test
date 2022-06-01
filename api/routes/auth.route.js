const express = require('express');
const passport = require('passport');
const { Usuario } = require('../db/models/usuarios.model');
const { checkApiKey } = require('../middleware/auth.handle');
const boom = require('@hapi/boom')
const AuthServices = require('../services/auth.services');
const service = new AuthServices;
const bcrypt = require('bcrypt');
const router = express.Router();
const validatoHandle = require('../middleware/validator.handle')
const { crearUsuarioSchema } = require('../schemas/usuario.schema')

router.post('/login',
    checkApiKey,
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            if (req.user.isBoom === true) {
                res.json(boom.unauthorized('usuario o password inexistente'))
            }
            const usuario = req.user.dataValues;
            res.json(await service.firmarToken(usuario))
        } catch (error) {
            next(error);
        }
    }
);

router.post("/signup",
    validatoHandle(crearUsuarioSchema, 'body'),
    async (req, res) => {
        const { nombre, email, password } = req.body;
        try {
            const existeUsuario = await Usuario.findOne({ where: { email } });
            if (existeUsuario !== null) {
                return res.json({ success: false, msg: "Ya existe un usuario con ese email" })
            } else {
                await Usuario.create({
                    nombre,
                    email,
                    password: await bcrypt.hash(password, 12)
                })
                res.json({ success: true, msg: "Usuario creado con éxito" })
            }
        } catch (error) {
            res.status(403).json({ error })
        }
    }
)

module.exports = router;
