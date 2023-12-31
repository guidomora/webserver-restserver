const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.userPath = '/api/users'

    // Conectar la base de datos
    this.dbConnect()
    
    //Middlewares ----> funcion que siempre se va a ejecutar cuando levantemos el servidor (mas adelante profundizamos)
    this.middlewares()

    this.routes(); // esto dispara el metodo
  }

  async dbConnect(){
    await dbConnection()
  }

  middlewares(){
    // Cors: nos permite proteger nuestro servidor de una forma superficial
    // es un middleware
    this.app.use(cors())

    //lectura y parseo del body
    this.app.use(express.json()) // cualquien info que venga de post, put, delete la va a intentar serializar a un json


    this.app.use(express.static('public')) //use es la palabra clave para decir que es un middleware
  }

  routes() {// llamando endpoints
           // ruta que vamos a tener que llamar
    this.app.use(this.userPath , require('../routes/user')) //path donde se encuentran
    
  }

  listen() {
    this.app.listen(this.port);// en vez de llamar al process.env.... solo llamamos al this.port
  }
}

module.exports = Server;


