const { response } = require("express");
const User = require("../models/user"); // nos va a permitir crear instancias de nuestro modelo
const bcrypt = require("bcryptjs"); // encriptar la password

const usersGet = async (req, res = response) => {
  //const { q, nombre, apikey = "no hay" } = req.query; // query http://localhost:8080/api/users?q=hola&nombre=guido
  // si no hay apikey en este caso, se reemplaza por lo establecido

  const { limite = 5, desde = 0 } = req.query;


  // esto al ser un arrya lo podemos desestructurar, en base al orden en que se crea
  const [total, users] = await Promise.all([// Promise.all ejecuta las promesas de manera simultanea y no va a avanzar hasta que hayan terminado de ejecutarse
    User.countDocuments({ state: true }), // total de usuarios que tienen estado true
    User.find({ state: true }) // solo devuelve los que el estado es true
      .limit(Number(limite)) // limit sirve para limitar la cantidad de resultados
      // hay que parsearlo a numero porque lo que recibe de la query es un string
      .skip(Number(desde)), // desde que numero queremos que se muestren los 5
  ]);

  res.json({
    total,
    users,
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params; // parametros en la ruta no usamos el body
  const { _id, password, google, mail, ...rest } = req.body;

  if (password) {
    rest.password = bcrypt.hashSync(password);
  }

  const user = await User.findByIdAndUpdate(id, rest); // recibimos el id y actualizamos el resto

  res.json({
    user,
  });
};

const usersPost = async (req, res) => {
  // se crea un usuario en la db
  //el body siempre viene de la request

  // const { nombre, edad } = req.body; desestructuramos lo que queremos traer del body ej http://localhost:8080/api/users/10

  const { name, mail, password, role, state } = req.body;
  const user = new User({ name, mail, password, role, state });

  const emailExists = await User.findOne({ mail }); // busca el mail en los usuarios
  if (emailExists) {
    // si existe arroja el error
    return res.status(400).json({
      msg: "El correo ya esta registrado",
    });
  }

  user.password = bcrypt.hashSync(password); // encriptar password

  await user.save();

  res.json({
    msg: "post Bien!",
    user,
  });
};

const usersDelete = async (req, res) => {

  const {id} = req.params // obtenemos el ide de los parametros

  // const user = await User.findByIdAndDelete(id)  Borra el usuario segun su id (no es la forma recomendada porque se borra completamente)

  // de esta forma al poner el estado en false no nos figura mas en los usuarios "activos" pero podemos seguir viendolo en la db
  const user = await User.findByIdAndUpdate(id, {state: false}) // obtenemos el usuario por id y se cambia el estado a false

  res.json(
    user
  );
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
