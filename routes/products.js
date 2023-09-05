const { check } = require("express-validator"); // para hacer validaciones
const { Router } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { createProduct, getProducts } = require("../controllers/products");
const router = Router();

// obtener todas las categorias
router.get("/", getProducts);

// obtener una categoria por id - publico
router.get(
  "/:id",
  []
);

// crear una categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields
  ],
  createProduct
);

// actualizar un registro con este id - privado - cualquiera con token valido
router.put(
  "/:id",
  [

  ],
  
);

//borrar una categoris - solo si es admin
router.delete("/:id", [

], );

module.exports = router;
