const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require('express-fileupload')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      uploads: "/api/uploads",
    };

    // Conectar la base de datos
    this.dbConnect();

    //Middlewares ----> funcion que siempre se va a ejecutar cuando levantemos el servidor (mas adelante profundizamos)
    this.middlewares();

    this.routes(); // esto dispara el metodo
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // Cors: nos permite proteger nuestro servidor de una forma superficial
    // es un middleware
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json()); // cualquien info que venga de post, put, delete la va a intentar serializar a un json

    this.app.use(express.static("public")); //use es la palabra clave para decir que es un middleware

    // Carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/'
  }));
  }

  routes() {
    // llamando endpoints
    this.app.use(this.paths.auth, require("../routes/auth"));

    // ruta que vamos a tener que llamar
    this.app.use(this.paths.users, require("../routes/user")); //path donde se encuentran
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads")); 
  }

  listen() {
    this.app.listen(this.port); // en vez de llamar al process.env.... solo llamamos al this.port
  }
}

module.exports = Server;
