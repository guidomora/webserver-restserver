const { check } = require("express-validator"); // para hacer validaciones
const { Router } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { uploadFile, updateFile } = require("../controllers/uploads");
const { allowedCollections } = require("../helpers/db-validators");
const { validateUploadedFile } = require("../middlewares/validate-file");
const router = Router();

router.post('/',validateUploadedFile, uploadFile) // se puede usar un put pero el estandar es POST

router.put('/:collection/:id', [
    validateUploadedFile,
    check('id',"Not a valid Mongo id").isMongoId(),

    // la c hace referencia a la coleccion recibida en el put y el array son las opciones permitidas
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updateFile)

module.exports = router;
