const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  nombreCompleto: { type: String, required: true },
  dni: { type: String },
  email: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  telefono: { type: String },
  rol: { type: String, default: "visitante" }
});

module.exports = mongoose.model("User", userSchema, "users");