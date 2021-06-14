const { response } = require("express");
const { subirArchivo } = require('../helpers');



const cargarArchivo = async( req, res = response ) => {
  
    if ( !req.files || Object.keys(req.files).length === 0  || !req.files.archivo ) {
      res.status(400).json({ msg: 'No hay archivos que subir' });
      return;
    }

    try {


        // ['txt', 'md'] segundo argumento para especificar cuales si permite pasar 
        // Caso contrario poner undefined para qu etomer el default de la funcion
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({
            nombre
        });
            
    } catch (msg) {
        res.status(400).json({ msg });
    }

    
  
 
}



module.exports = {
    cargarArchivo
}