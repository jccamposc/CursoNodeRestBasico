const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {

  const { q, nombre, apellido = "No apellido"} = req.query;
  res.json({
    msg: "get API - Controlador",
    q,
    nombre,
    apellido

  });
};

const usuariosPost = (req, res) => {

  const { nombre, edad} = req.body;

  res.json({
    msg: "post API - Controlador",
    nombre,
    edad
  });
};

const usuariosPut = (req, res) => {
  const { id } = req.params;

  res.json({
    msg: "put API - Controlador",
    id
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
