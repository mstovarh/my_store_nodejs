const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const AuthService = require('./../../../services/authServ');
const service = new AuthService();

const LocalStrategy = new Strategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      console.log('Authenticating user:', email);
      //hashedPassword = await bcrypt.hash(password, 10);
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false, { message: error.message });
    }
  },
);
module.exports = LocalStrategy;
