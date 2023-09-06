const { request, response } = require("express");
const path = require('path') // propio de node

const uploadFile = (req = request, res = response) => {
  // Copiado del repositorio de express-fileupload

  // pregunta si en la req esta la propiedad files
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) { // con el Object.keys hace un barrido de todos los files y evalua si por lo menos viene una propiedad ahi
                                                                             // Tambien !req.files.file porque file es el nombre que le pusimos a como recibimos el archivo
    res.status(400).send({msg:"No files were uploaded."}); // sino tambien arroja el error
    return;
  }


  const {file} = req.files

  const cutName = file.name.split('.') // divide cada vez que hay un punto
  const extension = cutName[cutName.length - 1] // obtenemos la ultima posicion que siempre va a ser el tipo de archivo

  // validar extension
  const validExtensions = ['png', 'jpg', 'jpeg', 'gif']

  if (!validExtensions.includes(extension)) {
    return res.status(400).json({
        msg:`The extension ${extension} is not allowed. Only ${validExtensions} are permitted`
    })
  }
  res.json(extension)

//   // el dirname va a apuntar a la carpeta de controllers pq es donde lo voy a llamar
//   const uploadPath = path.join(__dirname,  "../uploads/", file.name) // path donde se van a crear los archivos

//   file.mv(uploadPath, (err) => {
//     if (err) {
//       return res.status(500).json({err});
//     }

//     res.json({msg:"File uploaded to " + uploadPath});
//   });
};

module.exports = {
  uploadFile,
};
