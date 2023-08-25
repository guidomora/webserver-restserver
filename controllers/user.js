const { response } = require("express");

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

const usersPost = (req, res) => {
  //el body siempre viene de la request

  const { nombre, edad } = req.body; // desestructuramos lo que queremos traer del body ej http://localhost:8080/api/users/10

  res.json({
    msg: "post Bien!",
    nombre,
    edad,
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
