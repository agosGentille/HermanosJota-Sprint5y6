const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Rol", rolesSchema);
