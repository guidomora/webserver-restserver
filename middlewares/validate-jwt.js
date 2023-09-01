const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


// si toda esta funcion se ejecuta correctamente, se va a etsablecer la info del usuario en la request

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token') // como lo especifiquemos aca, es como en el front lo van a tener que utilizar
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY) // verificamos el jwt del user que va realizar el delete y extraemos el uid

        const user = await User.findById(uid) // buscamos si es un id valido para poder borrar

        // si el uid no existe o es undefined
        if (!user) {
            return res.status(401).json({
                msg: 'The token isnt valid'
            })
        }


        // Verificamos si el estado tiene el state en true
        if (!user.state) {
            return res.status(401).json({
                msg: 'The token isnt valid'
            })
        }

        req.user = user 
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'The token isnt valid'
        })
    }
}

module.exports = {
    validateJWT
}