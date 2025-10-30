const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexion exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectarse a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;

