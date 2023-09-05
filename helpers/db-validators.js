const Role = require("../models/role");
const User = require('../models/user')
const Category = require('../models/category')
const Product = require("../models/product");

const isValidRole = async (role = "") => {
  //en caso de que no venga el role va a ser un string vacio
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The role ${role} is not registered in the database`);
  }
};

const isEmailExists = async (mail ='') => {
  const emailExists = await User.findOne({ mail }); // busca el mail en los usuarios
  if (emailExists) {
    // si existe arroja el error
    throw new Error(`The mail ${mail} is already registered in the database`);
  }
};

const existsUserById = async (id) => {
  const userExists = await User.findById(id ); // busca el mail en los usuarios
  if (!userExists) {
    // si no existe arroja el error
    throw new Error(`The id ${id} doesn't exists`);
  }
};



const categoryExtists = async (id = '') => {
    const category = await Category.findById(id)
    if (!category) {
        throw new Error(`The id ${id} doesn't exists`)
      }
}

const productExtists = async (id = '') => {
  const product = await Product.findById(id)
  if (!product) {
      throw new Error(`The id ${id} doesn't exists`)
    }
}

module.exports = { isValidRole, isEmailExists, existsUserById, categoryExtists, productExtists };
