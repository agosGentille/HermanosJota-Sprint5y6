const User = require("../models/users");
// librería para *hashear* contraseñas (convertirlas en algo ilegible)
// Ejemplo: "123456"(contraseña) → "$2a$10$1oEJkf...."(hash)
// Nunca se guarda la contraseña real, solo el hash.
const bcrypt = require("bcryptjs");

// crea "tokens" que identifican al usuario una vez que inició sesión. (asi dejamos d usar el token falso)
// El token sirve para no tener que escribir el mail y password en cada request.
// Ejemplo de token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
     // Comparamos la contraseña que envía el usuario con la guardada en la DB.
    // bcrypt.compare() recibe la contraseña ingresada y el hash almacenado.
    // Devuelve true si coinciden, false si no.
    const passwordValida = await bcrypt.compare(password, usuario.clave);

    // Si la comparación con bcrypt falla devuelve 401 y muestra msj de error
    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Si el password es correcto, creamos un token JWT.
    // El token incluye un "payload" (información que querés guardar dentro del token)
    // con el id del usuario y se firma con una clave secreta.
    // process.env.JWT_SECRET -> se lee desde el archivo .env 
    // expiresIn: "1h" -> significa q el token vence en 1 hora.
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Enviamos al frontend el token + datos básicos del usuario para guardar en el localStorage
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

    // Hasheamos la contraseña antes de guardarla
    // bcrypt.hash("contraseña", 10)
    // El segundo parámetro (10) son los "saltRounds":
    // es cuántas veces se repite el proceso de cifrado. Más rondas = más seguro.
    //    Ejemplo: 8 -> rápido pero menos seguro; 
    //    10 -> equilibrio ideal; 
    //    12 -> más seguro pero más lento.
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      nombreCompleto: nombre,
      email,
      clave: hashedPassword, // Guardamos el hash, no el password original
      rol: rol || "visitante",
    });

    await nuevoUsuario.save(); //como intervinimos los datos, usamos save() en vez de create()

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
    //en este punto se supone que ya esta logueado el user. 
    // .select() sirve para elegir qué campos querés que te devuelva la consulta de MongoDB.
    // El "-" delante del nombre del campo indica exclusión.
    const usuario = await User.findById(req.user.id).select("-clave");
    //este select significa tipo: “traé todos los campos del usuario, menos el campo clave”.

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    
    res.json({ usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos del usuario" });
  }
};