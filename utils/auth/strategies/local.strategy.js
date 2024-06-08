const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('./../../../services/usuariosServ');
const service = new UserService();

const LocalStrategy = new Strategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      console.log('Authenticating user:', email);
      const user = await service.findByEmail(email);
      if (!user) {
        console.log('User not found');
        return done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Incorrect credentials');
        return done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      console.log('Error:', error);
      done(error, false);
    }
  },
);
module.exports = LocalStrategy;
