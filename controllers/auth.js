const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");

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

const googleSigin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if ( !usuario ) {
      //Tengo que crearlo
      const data = {
          nombre,
          correo,
          password: ':p',
          img,
          google: true
      };

      usuario = new Usuario( data );
      await usuario.save();
    }


    //si el usuario en DB
    if ( !usuario.estado ) {
      return res.status(401).json({
        msg: 'Hable con el admin, usuario bloqueado'
      })
    }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es valido",
    });
  }
};

module.exports = {
  login,
  googleSigin,
};
