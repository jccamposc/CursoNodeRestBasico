const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

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
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio Publico
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor Corriendo en el puerto', this.port);
        }) ;
    }
}


module.exports = Server;