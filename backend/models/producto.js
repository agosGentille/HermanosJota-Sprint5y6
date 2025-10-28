const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true,
    unique: true 
    },
  titulo: { 
    type: String, 
    required: true 
    },
  descripcion: { 
    type: String
     },
  Precio: { 
    type: Number,
    required: true 
    },
  categoria: { 
    type: String
    },
  medidas: { 
    type: String
    },
  materiales: { 
    type: String
    },
  acabado: { 
    type: String
    },
  peso: { 
    type: String
    },
  capacidad: { 
    type: String
    },
  tapizado: { 
    type: String
    },
  confort: { 
    type: String
    },
  almacenamiento: { 
    type: String
    },
  cables: { 
    type: String
    },
  extension: { 
    type: String
    },
  carga_max: { 
    type: String
    },
  caracteristicas: { 
    type: String
    },
  regulacion: { 
    type: String
    },
  certificacion: { 
    type: String
    },
  apilables: { 
    type: String
    },
  incluye: { 
    type: String
    },
  rotacion:{ 
    type: String
    },
  garantia: { 
    type: String
    },
  estructura: { 
    type: String
    },
  sostenibilidad: { 
    type: String
    },
  colchon: { 
    type: String
    },
  masVendidos: { 
    type: Boolean
    },
  imagen: { 
    type: String
    },
  imagenHover: { 
    type: String, 
    }

}, { timestamps: true });

const Producto = mongoose.model("Products", productSchema);

module.exports = Producto;
