const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return orders;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    const rta = await order.destroy();
    if (!rta) {
      throw boom.notFound('order not found');
    }
    return rta;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async findItemByOrderId(id) {
    const items = await models.OrderProduct.findAll({
      where: {
        orderId: id,
      },
    });
    return items;
  }

  async deleteItemByOrderId(id) {
    const rta = await models.OrderProduct.destroy({
      where: {
        orderId: id,
      },
    });
    return rta;
  }
}

module.exports = OrderService;
