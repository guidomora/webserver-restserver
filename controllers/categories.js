const { response, request } = require("express");
const Category = require("../models/category");
const User = require("../models/user");

//Obtener categorias -paginado - total - populate
const categoriesGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const [total, categories] = await Promise.all([
    // Promise.all ejecuta las promesas de manera simultanea y no va a avanzar hasta que hayan terminado de ejecutarse
    Category.countDocuments({ state: true }),
    Category.find({ state: true })
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("user", "name"), // Busca los usuarios que coincidan con el id y trae la info
  ]);
  res.json({
    total,
    categories,
  });
};

//Obtener categoria
const categoryById = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  if (!category) {
    return res.status(400).json({
      msg: "That id doesnt exists",
    });
  }
  res.json(category);
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `${categoryDB.name} already exist`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.user._id,
  };

  const category = await new Category(data);

  //guardar en DB
  await category.save();

  res.status(201).json(category);
};

// Actualizar categoria, recibir un nombre
const categoryUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body; // extraemos el usuario, state y el resto en la data
  data.name = data.name.toUpperCase()
  data.user = req.user._id

  const category = await Category.findByIdAndUpdate(id, data, {new: true});

  res.json({
    category,
  });
};

// Borrar categoria ----> state false
const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { state: false }, {new: true});

    res.json({
        category,
      });
}

module.exports = {
  createCategory,
  categoriesGet,
  categoryById,
  categoryUpdate,
  deleteCategory
};
