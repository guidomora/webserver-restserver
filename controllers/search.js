const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;
const Category = require("../models/category");
const User = require("../models/user");
const Product = require("../models/product");

const allowedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term); // si es un id de mongo devuelve true sino false

  if (isMongoID) {
    const user = await User.findById(term);
    res.json({
      results: user ? [user] : [],
    });
  }

  // IMPORTANTE!!!!!!!!!!!!!!!!!!!!!
  const regex = new RegExp(term, "i"); // Expresion regular, propia de js, hacemos que el termino sea insensible a las mayusculas y minusculas

  const users = await User.find({
    // $or es un or comun pero en mongo
    $or: [{ name: regex }, { mail: regex }], // nombre o mail
    $and: [{ state: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term); // si es un id de mongo devuelve true sino false

  if (isMongoID) {
    const category = await Category.findById(term);
    res.json({
      results: category ? [category] : [],
    });
  }

  // IMPORTANTE!!!!!!!!!!!!!!!!!!!!!
  const regex = new RegExp(term, "i"); // Expresion regular, propia de js, hacemos que el termino sea insensible a las mayusculas y minusculas

  const categories = await Category.find({ name: regex });

  res.json({
    results: categories,
  });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term); // si es un id de mongo devuelve true sino false

  if (isMongoID) {
    const product = await Product.findById(term).populate(
      "category",
      "name"
    );
    res.json({
      results: product ? [product] : [],
    });
  }

  // IMPORTANTE!!!!!!!!!!!!!!!!!!!!!
  const regex = new RegExp(term, "i"); // Expresion regular, propia de js, hacemos que el termino sea insensible a las mayusculas y minusculas

  const products = await Product.find({ name: regex, state: true }).populate(
    "category",
    "name"
  );

  res.json({
    results: products,
  });
};

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The allowed collections are: ${allowedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    case "roles":
      break;

    default:
      res.status(500).json({
        msg: "Forgot to do this search :(",
      });
  }
};

module.exports = { search };
