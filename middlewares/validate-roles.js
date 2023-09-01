const { response } = require("express");

// Valida que el usuario sea solo sea admin

const isAdminRole = (req, res = response, next) => {
  // se valida el jwt
  if (!req.user) {
    return res.status(500).json({
      msg: "The token must be validated first, then the role",
    });
  }

  const { role, name } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not allowed to do it`,
    });
  }

  next();
};

// Valida que el usuario sea varios roles especificados

const hasARole = (...roles) => { // se reciben los roles
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "The token must be validated first, then the role",
      });
    }

    if (!roles.includes(req.user.role)) { // si el rol que tiene el usuario no coincide con uno de los roles recibidos lanza el error
      return res.status(401).json({
        msg: `The service requires one of these roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasARole,
};
