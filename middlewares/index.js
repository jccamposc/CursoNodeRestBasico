const validarCampos = require("../middlewares/validarCampos");
const validarJWT = require("../middlewares/validarJWT");
const validaRoles = require("../middlewares/validarRoles");
const validarArchivoSubir = require("../middlewares/validarArchivoSubir");




module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivoSubir,
}
