const { check } = require("express-validator"); // para hacer validaciones
const { Router } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { uploadFile } = require("../controllers/uploads");
const router = Router();

router.post('/', uploadFile) // se puede usar un put pero el estandar es POST

module.exports = router;
