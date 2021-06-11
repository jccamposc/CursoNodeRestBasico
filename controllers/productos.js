const { response } = require("express");
const { Producto, Categoria } = require("../models");

//Obtener categorias - paginado - total - populate
const obtenerProducto = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};

//OBtener categoria - populate
const obtenerPorductoPorId = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDb = await Producto.findOne({ nombre: body.nombre });

  if (productoDb) {
    return res.status(400).json({
      msg: `EL producto ${productoDb.nombre} ya existe `,
    });
  }

  //Gnerar Data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  // Guardar en BD
  const producto = new Producto(data);

  console.log("ajijo", producto);

  await producto.save();

  res.status(201).json(producto);
};

//actualizar categoria
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if ( data.nombre ) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

//Borrar categoria - estado a false
const borrarProducto = async (req, res = response) => {
  const { id } = req.params;

  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(productoBorrado);
};

module.exports = {
  crearProducto,
  obtenerProducto,
  obtenerPorductoPorId,
  actualizarProducto,
  borrarProducto,
};
