const { request, response } = require("express");
const path = require('path') // propio de node
const {v4: uuidv4} =require('uuid')

                                            // validar extension
const uploadFileHelper = (files, validExtensions = ["png", "jpg", "jpeg", "gif"], folder = '') => {
  // como no tengo req traemos directo los files

  return new Promise((resolve, reject) => {
    const { file } = files;

    const cutName = file.name.split("."); // divide cada vez que hay un punto
    const extension = cutName[cutName.length - 1]; // obtenemos la ultima posicion que siempre va a ser el tipo de archivo

    if (!validExtensions.includes(extension)) {
      return reject(
        `The extension ${extension} is not allowed. Only ${validExtensions} are permitted`
      );
    }

    const tempName = uuidv4() + "." + extension; // asi va a quedar el nombre del archivo

    // el dirname va a apuntar a la carpeta de controllers pq es donde lo voy a llamar
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName); // path donde se van a crear los archivos

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

       resolve(tempName);
    });
  });
};

module.exports = { uploadFileHelper };
