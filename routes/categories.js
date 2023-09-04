const { check } = require("express-validator"); // para hacer validaciones
const { Router, request, response } = require("express");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createCategory,
  categoriesGet,
  categoryById,
  categoryUpdate,
  deleteCategory,
} = require("../controllers/categories");
const { categoryExtists } = require("../helpers/db-validators");
const { isAdminRole } = require("../middlewares/validate-roles");
const router = Router();

// obtener todas las categorias
router.get("/", categoriesGet);

// obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "Not a valid Mongo id").isMongoId(),
    check("id").custom(categoryExtists),
    validateFields,
  ],
  categoryById
);

// crear una categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// actualizar un registro con este id - privado - cualquiera con token valido
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  categoryUpdate
);

//borrar una categoris - solo si es admin
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check("id", "Not a valid Mongo id").isMongoId(),
    check("id").custom(categoryExtists),
    validateFields
], deleteCategory);

module.exports = router;
