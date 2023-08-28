const { Router } = require("express");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/user");
const { check } = require("express-validator"); // para hacer validaciones

const router = Router();

//rutas relacionadas con los usuarios

// endpoints
router.get("/", usersGet); // llamamos a la funcion de controllers/users

router.put("/:id", usersPut); // aclaramos que vamos a recir un parametro en la ruta y que se va a llamar id

router.post("/", [
  // check es un middleware, el primer argumento es el nombre del campo, segundo el error y despues aclaramos que es un mail
  check('mail', 'Email is not valid').isEmail()
] , usersPost);

router.delete("/", usersDelete);

router.patch("/", usersPatch);
// endpoints

module.exports = router;
