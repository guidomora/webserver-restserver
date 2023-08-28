const Role = require('../models/role')



const isValidRole = async (role = '') => { //en caso de que no venga el role va a ser un string vacio
    const existsRole = await Role.findOne({role})
    if (!existsRole) {
      throw new Error(`The role ${role} is not registered in the database`)
    }
  }

  module.exports = {isValidRole}