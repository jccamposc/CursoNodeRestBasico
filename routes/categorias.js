const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { crearCategoria, 
        obtenerCategoria, 
        obtenerCategoriaPorId,
        actualizarCategoria,
        borrarCategoria } = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/dbValidators');


const router = Router();

/**
 * {{url}}/api/categorias
 */

// obtener todas las categorias - publico
router.get('/', obtenerCategoria);

// obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos    
], obtenerCategoriaPorId);


// Crear categoria - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

], crearCategoria);

// Actualizar categoria - privado - cualquier persona con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos    
], actualizarCategoria);

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos    
], borrarCategoria);


module.exports = router;