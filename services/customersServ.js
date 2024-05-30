const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { da } = require('@faker-js/faker');
class CustomerService {
  constructor() {}
  async find() {
    const rta = await models.Customer.findAll({ include: ['user'] });
    return rta;
  }
  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }
  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }
  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes, { include: ['user'] });
    return rta;
  }
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: id };
  }
}
module.exports = CustomerService;
