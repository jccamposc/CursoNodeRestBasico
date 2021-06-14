const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");
const fileUpload = require('express-fileupload');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      categorias: "/api/categorias",
      productos: "/api/productos",
      usuarios: "/api/usuarios",
      uploads: "/api/uploads",
    };

    //Conectar a BD Mongo
    this.conectarDb();

    //Midlewares
    this.midlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  async conectarDb() {
    await dbConection();
  }

  midlewares() {
    //Cors
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio Publico
    this.app.use(express.static("public"));

    // File Upload - carga de archivos
    this.app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true
      }));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor Corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
