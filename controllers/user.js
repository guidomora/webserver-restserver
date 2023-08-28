const { response } = require("express");
const User = require("../models/user"); // nos va a permitir crear instancias de nuestro modelo
const bcrypt = require('bcryptjs'); // encriptar la password


const usersGet = (req, res = response) => {
  const { q, nombre, apikey = "no hay" } = req.query; // query http://localhost:8080/api/users?q=hola&nombre=guido
  // si no hay apikey en este caso, se reemplaza por lo establecido

  res.json({
    msg: "post Bien!",
    q,
    nombre,
    apikey,
  });
};

const usersPut = (req, res) => {
  const id = req.params.id; // parametros en la ruta no usamos el body

  res.json({
    msg: "put Bien!",
    id,
  });
};

const usersPost = async (req, res) => {
  // se crea un usuario en la db
  //el body siempre viene de la request

  // const { nombre, edad } = req.body; desestructuramos lo que queremos traer del body ej http://localhost:8080/api/users/10

  const { name, mail, password, role, state } = req.body;
  const user = new User({name, mail, password, role, state});

  const emailExists =  await User.findOne({mail}) // busca el mail en los usuarios
  if (emailExists) { // si existe arroja el error
    return res.status(400).json({
      msg:'El correo ya esta registrado'
    })
  }

  user.password = bcrypt.hashSync(password) // encriptar password

  await user.save();

  res.json({
    msg: "post Bien!",
    user
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: "delete Bien!",
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "patch Bien!",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
};
