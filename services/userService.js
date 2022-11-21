const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class UserService {
  constructor() {

  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) throw boom.notFound("Usuario no encontrado");

    return user;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    const updateUser = await user.update(data);
    return updateUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
