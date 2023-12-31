// middleware personalizado

const { validationResult } = require("express-validator")

const validateFields = (req, res, next) => { // next es el tercer agurmento de un middleware, 
    const errors = validationResult(req)
  if (!errors.isEmpty()) { // si errors no esta vacio, retorna el error
    return res.status(400).json(errors)
  }
  next() // si se llega a este punto le dice a la aplicacion que siga con el siguiente middleware
        // o con el singuiente controlador
}

module.exports = { validateFields}