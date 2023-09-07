const { request, response } = require("express");

const validateUploadedFile = (req = request, res = response, next) => {
    // pregunta si en la req esta la propiedad files
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    // con el Object.keys hace un barrido de todos los files y evalua si por lo menos viene una propiedad ahi
    // Tambien !req.files.file porque file es el nombre que le pusimos a como recibimos el archivo
    return res.status(400).send({ msg: "No files were uploaded." }); // sino tambien arroja el error
  }

  next();
};


module.exports = {validateUploadedFile}