const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({ ...data, password: hash });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: ['customer'],
    });
    users.forEach((user) => {
      delete user.dataValues.password;
    });
    return users;
  }

  async findByEmail(email) {
    //console.log('findByEmail called with email:', email);
    const user = await models.User.findOne({
      where: { email },
    });
    //console.log('findByEmail result:', rta);
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 10);
    }
    const updatedUser = await user.update(changes);
    delete updatedUser.dataValues.password;
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
