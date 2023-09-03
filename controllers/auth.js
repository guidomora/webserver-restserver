const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { mail, password } = req.body;

  // Validaciones
  try {
    // si el usuario esta registrado
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        msg: "User / password are incorrect",
      });
    }

    // si el usuario esta activo
    if (!user.state) {
      return res.status(400).json({
        msg: "User / password are incorrect",
      });
    }

    // si la passwrod es correcta
    const validPassword = bcryptjs.compareSync(password, user.password); // recibe la password actual y la compara con la password de la db
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / password are incorrect ",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk with the admin",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, mail } = await googleVerify(id_token); // payload
    console.log('auth', { name, picture, mail });
    let user = await User.findOne({mail})

    // Creacion del usuario
    if (!user) {
      const data = {
        name,
        mail,
        password: '123456',
        picture,
        google: true,
        role: 'USER_ROLE',
        state: true
      }
      user = new User(data)
      await user.save()
    }

    if (!user.state) {
      res.status(401).json({
        msg: "Talk with the admin. user bloqued",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Google Token unable to be verified",
    });
  }
};

module.exports = { login, googleSignIn };
