const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { crearProducto, 
        obtenerProducto, 
        obtenerPorductoPorId,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');

const { existeCategoriaPorId, existeCategoria, existeProductoPorId } = require('../helpers/dbValidators');


const router = Router();

/**
 * {{url}}/api/categorias
 */

// obtener todas las categorias - publico
router.get('/', obtenerProducto);

// obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos    
], obtenerPorductoPorId);


// Crear producto - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto);

// Actualizar categoria - privado - cualquier persona con token valido
router.put('/:id', [
    validarJWT,
    check('id').custom( existeProductoPorId ),
    validarCampos    
], actualizarProducto);

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos    
], borrarProducto);


module.exports = router;