const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  dni: { type: String },
  email: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  telefono: { type: String },
  calleynumero: { type: String },
  localidad: { type: String },
  provincia: { type: String },
  pais: { type: String },
});

module.exports = mongoose.model("User", userSchema, "users");
