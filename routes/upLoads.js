const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, 
    validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, 
    actualizarImagen, 
    mostrarImagen, 
    actualizarImagenCloudinary } = require('../controllers/upLoads');
const { coleccionesPermitidas } = require('../helpers/dbValidators');



const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo); 

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
],  actualizarImagenCloudinary); //actualizarImagen

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
],  mostrarImagen);

module.exports = router;
