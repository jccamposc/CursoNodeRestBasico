const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apellido = "No apellido" } = req.query;
  res.json({
    msg: "get API - Controlador",
    q,
    nombre,
    apellido,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificar si correo existe
 

  //encriptar hacer hash pass
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  await usuario.save();

  res.json({
    usuario
  });
};

const usuariosPut = async(req, res = response) => {
  
  const { id } = req.params;
  const {_id, password, google, correo, ...resto } = req.body;

  //TODO validad contra BD
  if ( password ) {
        //encriptar hacer hash pass
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto );

  res.json({
    msg: "put API - Controlador",
    usuario
  });
  
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - Controlador",
  });
};

const usuariosPath = (req, res) => {
  res.json({
    msg: "patch API - Controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPath,
};
