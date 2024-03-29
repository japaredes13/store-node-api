const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');

class CustomerService {
  constructor() {

  }

  async create(data) {
    const newCustomer = await models.Customer.create(data,{
      include : ['user']
    });
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll({
      include : ['user']
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) throw boom.notFound("Cliente no encontrado");

    return customer;
  }

  async update(id, data) {
    const customer = await this.findOne(id);
    const updateCustomer = await customer.update(data);
    return updateCustomer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
