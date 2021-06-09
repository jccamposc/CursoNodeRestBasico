const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    //verificar si el correo existe
    if (!usuario) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - Correo",
      });
    }

    //Verificar si el usuario esta activo
    if (!usuario.estado) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - Estado: false",
      });
    }

    //Verificar sii el password
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - Password",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
