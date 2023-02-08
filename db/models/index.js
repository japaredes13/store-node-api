const { User, UserSchema } = require('./userModel');
const { Customer, CustomerSchema} = require('./customerModel');
const { Category, CategorySchema } = require('./categoryModel');
const { Product, ProductSchema} = require('./productModel');

function setUpModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setUpModels;
