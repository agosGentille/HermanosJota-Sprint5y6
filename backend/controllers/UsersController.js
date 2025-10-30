const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.clave);
    if (!passwordValida && password !== usuario.clave) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      usuario: {
        nombre: usuario.nombreCompleto,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// REGISTRO
exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      nombreCompleto: nombre,
      email,
      clave: hashedPassword,
      rol: rol || "visitante",
    });

    await nuevoUsuario.save();

    const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      usuario: {
        nombre: nuevoUsuario.nombreCompleto,
        email: nuevoUsuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.getUsuario = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    console.log("Usuario encontrado: ", usuario);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos del usuario" });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.clave && updates.clave.trim() !== "") {
      updates.clave = await bcrypt.hash(updates.clave, 10);
    } else {
      delete updates.clave;
    }

    delete updates.email;

    const usuario = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-clave");

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.user.id);

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

// obtener todos los usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await User.find().select("-clave");
    res.status(200).json(usuarios);
    console.log("Usuarios enviados: ", usuarios);
  } catch (error) {
    console.error("Error en /api/usuarios: ", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// actualizar rol de usuario (solo admin)
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  // const { rol } = req.body;

  try {
    const usuario = await User.findById(id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    
    const userRol = (usuario.rol || "").toString().toLowerCase();
    if (userRol === "admin") {
      usuario.rol = "visitante";
    } else {
      usuario.rol = "admin";
    }

    await usuario.save();
    res.json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el rol" });
  }
};

// eliminar usuario (solo admin)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await User.findById(id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    await User.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};