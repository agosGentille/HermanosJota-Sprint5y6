import { guardarCarrito } from "./CarritoStorage";

// Calcular total
export const calcularTotal = (carrito) =>
  carrito.reduce((acc, p) => acc + (p.precio || p.Precio || 0) * p.cantidad, 0);

// Agregar producto
export const agregarProducto = async (carrito, setCarrito, producto) => {
  const existe = carrito.find(p => p.id === producto.id);
  let nuevoCarrito;

  if (existe) {
    nuevoCarrito = carrito.map(p =>
      p.id === producto.id
        ? { ...p, cantidad: p.cantidad + (producto.cantidad || 1) }
        : p
    );
  } else {
    nuevoCarrito = [...carrito, { ...producto, cantidad: producto.cantidad || 1 }];
  }

  setCarrito(nuevoCarrito);
  await guardarCarrito(localStorage.getItem("emailUsuario"), nuevoCarrito);
};

// Eliminar producto
export const eliminarProducto = async (carrito, setCarrito, id) => {
  const nuevoCarrito = carrito.filter(p => p.id !== id);
  setCarrito(nuevoCarrito);
  await guardarCarrito(localStorage.getItem("emailUsuario"), nuevoCarrito);
};

// Vaciar carrito
export const vaciarCarrito = async (setCarrito) => {
  setCarrito([]);
  await guardarCarrito(localStorage.getItem("emailUsuario"), []);
};

// Sumar cantidad
export const sumarCantidad = async (carrito, setCarrito, id) => {
  const nuevoCarrito = carrito.map(p =>
    p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
  );
  setCarrito(nuevoCarrito);
  await guardarCarrito(localStorage.getItem("emailUsuario"), nuevoCarrito);
};

// Restar cantidad
export const restarCantidad = async (carrito, setCarrito, id) => {
  const nuevoCarrito = carrito.map(p =>
    p.id === id ? { ...p, cantidad: p.cantidad > 1 ? p.cantidad - 1 : 1 } : p
  );
  setCarrito(nuevoCarrito);
  await guardarCarrito(localStorage.getItem("emailUsuario"), nuevoCarrito);
};

