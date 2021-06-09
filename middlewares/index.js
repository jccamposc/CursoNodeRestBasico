const validarCampos = require("../middlewares/validarCampos");
const validarJWT = require("../middlewares/validarJWT");
const validaRoles = require("../middlewares/validarRoles");


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
}
