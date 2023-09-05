const { response, request } = require("express");
const Category = require("../models/category");
const User = require("../models/user");
const Product = require("../models/product");

const getProducts = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const [total, products] = await Promise.all([
    // Promise.all ejecuta las promesas de manera simultanea y no va a avanzar hasta que hayan terminado de ejecutarse
    Product.countDocuments({ state: true }),
    Product.find({ state: true })
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("user", "name") // Busca los usuarios que coincidan con el id y trae la info
      .populate("category", "name"),
  ]);
  res.json({
    total,
    products,
  });
};

const createProduct = async (req = request, res = response) => {
  const { name, price, category, description } = req.body;

  const productDB = await Product.findOne({ name });

  if (productDB) {
    return res.status(400).json({
      msg: `${productDB.name} already exist`,
    });
  }

  // Generar la data a guardar
  const data = {
    user: req.user._id,
    name,
    price,
    category,
    description,
  };

  const product = await new Product(data);

  //guardar en DB
  await product.save();

  res.status(201).json(product);
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  if (!product) {
    return res.status(400).json({
      msg: "That id doesnt exists",
    });
  }
  res.json(product);
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body; // extraemos el usuario, state y el resto en la data
  if (data.name) {
    data.name = data.name.toUpperCase()
  }
     
  data.user = req.user._id

  // el {new} indica que Mongoose devuelva el documento actualizado después de realizar la operación de actualización
  const product = await Product.findByIdAndUpdate(id, data, {new: true}); 

  res.json({
    product,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    product,
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct
};
