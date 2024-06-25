const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
//const { da } = require('@faker-js/faker');
class CustomerService {
  constructor() {}
  async find() {
    const customers = await models.Customer.findAll({ include: ['user'] });
    customers.forEach((customer) => {
      delete customer.dataValues.password;
    });
    return customers;
  }
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    delete customer.dataValues.password;
    return customer;
  }
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.password;
    return newCustomer;
  }
  async update(id, changes) {
    const customer = await this.findOne(id);
    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 10);
    }
    const updatedCustomer = await customer.update(changes, {
      include: ['user'],
    });
    delete updatedCustomer.dataValues.password;
    return updatedCustomer;
  }
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: id };
  }
}
module.exports = CustomerService;
