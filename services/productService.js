const faker = require('faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id    : faker.datatype.uuid(),
        name  : faker.commerce.productName(),
        price : parseInt(faker.commerce.price(), 10),
        image : faker.image.imageUrl(),
      });
    }
  }

  create() {

  }

  getAll(limit) {
    return this.products.slice(limit-1);
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }

  update() {

  }

  delete() {

  }

}

module.exports = ProductsService;
