const { Strategy } = require('passport-local');

const AuthServices = require('../../../services/auth.services');
const service = new AuthServices();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const usuario = await service.traerUsuario(email, password)
      done(null, usuario);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;