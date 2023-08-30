const { check } = require("express-validator"); // para hacer validaciones
const { login } = require("../controllers/auth");
const { Router } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const router = Router();


router.post('/login', [
    check('mail', 'Mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login)

module.exports = router