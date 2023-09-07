const path = require('path')
const fs = require('fs')
const { request, response } = require("express");
const { uploadFileHelper } = require("../helpers/upload-file");
const User = require('../models/user')
const Product = require('../models/product')

const uploadFile = async (req = request, res = response) => {
  // Copiado del repositorio de express-fileupload

  try {
    // const name = await uploadFileHelper(req.files, ['txt'], 'textos') //// Modelo de como quedaria con todos los argumentos
    const name = await uploadFileHelper(req.files, undefined, 'imgs');

    res.json({
      name,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const updateFile = async (req = request, res = response) => {
  const {collection, id} =req.params

  let model; // se va a almacenar el modelo

  switch (collection) { // validamos que segun la coleccion que recibamos, el id sea correcto
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: 'There is no user with that id'
        })
      }
      break;
      case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: 'There is no product with that id'
        })
      }
      break;
  
    default:
      return res.status(500).json({
        msg: 'Forgot to validate this :('
      });
  }

  // limpiar imagenes previas: reemplaza la imagen actual por la nueva que se sube
  if (model.img) {
    const imgPath = path.join(__dirname, '../uploads', collection, model.img)
    // puede ser que el imgPath no exista entonces vamos a averiguar si existe
    if (fs.existsSync(imgPath)) { // verifica
      fs.unlinkSync(imgPath) // lo borra
    }
  }

  // al ser correcto se crea la imagen, con la carpeta con el nombre de la coleccion
  const name = await uploadFileHelper(req.files, undefined, collection);
  model.img = name // se sube la imagen al modelo

  await model.save() // se guarda en la db
  
  res.json(model)
}

module.exports = {
  uploadFile,
  updateFile
};
