const { Router } = require("express");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/user");
const { check } = require("express-validator"); // para hacer validaciones
const { validateFields } = require("../middlewares/validate-fields");
const { isValidRole, isEmailExists, existsUserById } = require("../helpers/db-validators");

const router = Router();

//rutas relacionadas con los usuarios

// endpoints
router.get("/", usersGet); // llamamos a la funcion de controllers/users

router.put("/:id", [
  check('id', 'Not a valid ID').isMongoId(),
  check('id').custom(existsUserById),
  validateFields
], usersPut); // aclaramos que vamos a recir un parametro en la ruta y que se va a llamar id

router.post(
  "/",
  [
    // check es un middleware, el primer argumento es el nombre del campo, segundo el error y despues aclaramos que es un mail
    check("mail", "Email is not valid").isEmail(),
    check("mail").custom(isEmailExists),
    check("name", "Is required").not().isEmpty(), // el nombre no puede estar vacio
    check("password", "At least 6 characters").isLength({ min: 6 }),
    check("role").custom(isValidRole), //no hace falta que le mandemos argumento porque el primer argumento que recibe 
                                      // custom tamb es el role tambien va a ser el argumento de isValidRole
    validateFields, // custom middeware
  ],
  usersPost
);

router.delete("/", usersDelete);

router.patch("/", usersPatch);
// endpoints

module.exports = router;
