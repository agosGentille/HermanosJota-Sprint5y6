const jwt = require("jsonwebtoken");
require("dotenv").config();

//función verificarToken, se ejecuta antes de acceder a las rutas protegidas.
function verificarToken(req, res, next) {

  //Toma el valor del encabezado HTTP llamado Authorization
  const authHeader =  req.headers.authorization;

  /*authHeader && authHeader.split(" ")[1]
  Si no existe authHeader, la variable token será undefined.
  Si authHeader existe, split(" ") divide la cadena en dos partes:
    "Bearer" ([0]) y el token JWT real ([1]). Entonces se toma la segunda parte del header 
    (el token) con authHeader.split(" ")[1]
  */
  const token = authHeader && authHeader.split(" ")[1]; 
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    /*jwt.verify(...) verifica que el token: 1)No haya sido modificado.
    2)No haya expirado (según el expiresIn definido al crearlo).
    3)Haya sido firmado con la misma clave secreta (JWT_SECRET).
    Si todo está ok, devuelve el payload decodificado */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    //Si es válido, guardamos el payload (info del user) en el objeto 'req'
      // para que las rutas posteriores puedan usarlo.
    req.user = decoded; 
    next(); // Dejamos que la petición continúe hacia su destino
  } catch {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

module.exports = verificarToken;