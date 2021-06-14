const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require('../helpers');

const { Usuario, Producto} = require('../models');

const cargarArchivo = async( req, res = response ) => {
  

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


const actualizarImagen = async( req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo; 

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
            case 'productos':
                modelo = await Producto.findById( id );
                if ( !modelo ) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${ id }`
                    });
                }
                break;
    
        default:
           return res.status(500).json({
               msg: 'se me olvido validar esto'
           })
    }

    //Limpiar img previas
    if ( modelo.img ) {
        //Hay que borrar l aimg del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre =await  subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo );
}

const mostrarImagen = async( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo; 

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
            case 'productos':
                modelo = await Producto.findById( id );
                if ( !modelo ) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${ id }`
                    });
                }
                break;
    
        default:
           return res.status(500).json({
               msg: 'se me olvido validar esto'
           })
    }

    //Limpiar img previas
    if ( modelo.img ) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            res.sendFile( pathImagen );
            return
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-Image.jpg' );
    res.sendFile( pathImagen );

}

const actualizarImagenCloudinary = async( req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo; 

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
            case 'productos':
                modelo = await Producto.findById( id );
                if ( !modelo ) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${ id }`
                    });
                }
                break;
    
        default:
           return res.status(500).json({
               msg: 'se me olvido validar esto'
           })
    }

    //Limpiar img previas
    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre =  nombreArr[ nombreArr.length - 1];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
        
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;

    await modelo.save();

    res.json( modelo );
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}