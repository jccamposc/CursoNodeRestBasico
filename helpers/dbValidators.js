const Role = require("../models/role");
const { Usuario, Categoria } = require("../models");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado en la BD`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const existeUsuario = await Usuario.findById( id );
  if ( !existeUsuario ) {
    throw new Error(`El id ${id} no existe`);
  }
};

/**
 * Validadores de categoria por id
 */
const existeCategoriaPorId = async ( id ) => {
  const existeCategoria = await Categoria.findById( id );
  if ( !existeCategoria ) {
    throw new Error(`El id ${id} no existe`);
  }
}

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
  existeCategoriaPorId
};
