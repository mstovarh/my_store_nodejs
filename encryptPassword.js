const bcrypt = require('bcrypt');
const { User } = require('./db/models/user.model');
const { models } = require('./libs/sequelize');
const { UserService } = require('./services/usuariosServ');

async function encryptPasswords() {
  try {
    const users = await User.findAll();

    for (const user of users) {
      if (!user.password.startsWith('$2b$')) {
        //const service = new UserService();
        const hashedPassword = await bcrypt.hash(user.password, 10);
        /*         const newUser = await service.update(user.id, {
          password: hashedPassword,
        });
        delete newUser.dataValues.password; */
        user.password = hashedPassword;
        await user.save();
      }
    }

    console.log('Todas las contraseñas han sido cifradas correctamente.');
  } catch (error) {
    console.error('Error al cifrar las contraseñas:', error);
  }
}

module.exports = encryptPasswords;
