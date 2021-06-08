const { Router } = require('express');
const { check } = require('express-validator');



const { usuariosGet, 
        usuariosPost,
        usuariosPut, 
        usuariosDelete, 
        usuariosPath } = require("../controllers/usuarios");

const { validarCampos } = require('../middlewares/validarCampos');

const { esRolValido, existeEmail, existeUsuarioPorId } =  require('../helpers/dbValidators');

const router = Router();

router.get("/", usuariosGet);

router.post("/", [
        check('nombre', 'El nombre es obliagtorio').not().isEmpty(),
        check('password', 'El password debe ser mas de 6 letras').isLength({ min:6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( existeEmail ),
        //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPost);


router.put("/:id", [
        check('id', 'No es un ID valido de mongo').isMongoId(),
        check('id').custom( existeUsuarioPorId), 
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPath);

module.exports = router;
