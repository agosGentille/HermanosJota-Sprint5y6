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
  const { nombreCompleto, email, clave, rol } = req.body;

  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(clave, 10);

    const nuevoUsuario = new User({
      nombreCompleto,
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