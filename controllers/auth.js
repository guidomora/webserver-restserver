const { response } = require("express");
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJwt");

const login = async (req, res = response) => {
  const { mail, password } = req.body;

  // Validaciones
  try {
    // si el usuario esta registrado
    const user = await User.findOne({mail})
    if (!user) {
        return res.status(400).json({
            msg: 'User / password are incorrect'
        })
    }

    // si el usuario esta activo
    if (!user.state) {
        return res.status(400).json({
            msg: 'User / password are incorrect'
        })
    }

    // si la passwrod es correcta
    const validPassword = bcryptjs.compareSync(password, user.password) // recibe la password actual y la compara con la password de la db
    if (!validPassword) {
        return res.status(400).json({
            msg: 'User / password are incorrect '
        })
    }

    // Generar el JWT
     const token =  await generateJWT(user.id)
    

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk with the admin",
    });
  }
};

module.exports = { login };
