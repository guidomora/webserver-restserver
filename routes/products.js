const { check } = require("express-validator"); // para hacer validaciones
const { Router } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");
const { productExtists } = require("../helpers/db-validators");
const { isAdminRole } = require("../middlewares/validate-roles");
const router = Router();

// obtener todas las producto
router.get("/", getProducts);

// obtener una producto por id - publico
router.get(
  "/:id",
  [
    check("id", "Not a valid Mongo id").isMongoId(),
    check("id").custom(productExtists),
    validateFields,
  ],
  getProductById
);

// crear una producto - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createProduct
);

// actualizar un registro con este id - privado - cualquiera con token valido
router.put("/:id", [
  validateJWT,
  check("id", "Not a valid Mongo id").isMongoId(),
  check("id").custom(productExtists),
  validateFields,
], updateProduct);

//borrar un producto - solo si es admin
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Not a valid Mongo id").isMongoId(),
    check("id").custom(productExtists),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
