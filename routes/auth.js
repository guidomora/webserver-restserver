const { check } = require("express-validator"); // para hacer validaciones
const { login, googleSignIn } = require("../controllers/auth");
const { Router } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const router = Router();

router.post(
  "/login",
  [
    check("mail", "Mail is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "id_token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
