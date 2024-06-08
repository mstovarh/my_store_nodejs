const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({ ...data, password: hash });
    newUser.dataValues.password = undefined;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: ['customer'],
    });
    users.forEach((user) => {
      user.dataValues.password = undefined;
    });
    return users;
  }

  async findByEmail(email) {
    //console.log('findByEmail called with email:', email);
    const user = await models.User.findOne({
      where: { email },
    });
    if (user) {
      user.dataValues.password = undefined;
    }
    //console.log('findByEmail result:', rta);
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    user.dataValues.password = undefined;
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 10);
    }
    const updatedUser = await user.update(changes);
    updatedUser.dataValues.password = undefined;
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
