const formatoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validarEmail(email) {
  if (!email) {
    return { valido: false, error: "El email es obligatorio" };
  }
  
  if (!formatoEmail.test(email)) {
    return { valido: false, error: "Ingrese un email válido: ejemplo@gmail.com" };
  }

  return { valido: true, error: "" };
}