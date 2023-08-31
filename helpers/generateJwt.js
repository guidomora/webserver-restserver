const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  // el uid se va a almacenar en el payload del jwt
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => { // callback final en caso de error
        if (err) {
          console.log(err);
          reject("failed to generate the token");
        } else { //si todo sale bien
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
