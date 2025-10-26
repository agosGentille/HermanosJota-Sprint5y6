const usuarios = require("../data/usuarios");

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Buscar en el array d usuairos
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // Token falso temporal (en el futuro podemos usar alguno real, JWT x ej, q expire cada cierto tiempo)
  const token = "fake-token-" + usuario.id;

  res.json({
    token,
    usuario: {
      nombre: usuario.nombre,
      email: usuario.email
    }
  });
};

// REGISTRO TEMPORAL - Los usuarios registrados existen en el servidor mientras este
//corriendo. Si se reinicia NODE, se pierde todo.
exports.register = (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) return res.status(400).json({ error: "Faltan datos" });

  // Chequea si el usuario ya existe (email ya registrado)
  const existe = usuarios.some(u => u.email === email);
  if (existe) return res.status(400).json({ error: "El usuario ya existe" });

  const id = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
  const nuevoUsuario = { id, nombre, email, password };
  usuarios.push(nuevoUsuario);

  const token = "fake-token-" + id;
  res.json({ token, usuario: nuevoUsuario });
};