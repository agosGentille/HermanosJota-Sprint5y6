const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const formularios = [];

const verifyCaptcha = async (token, remoteIp) => {
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
  const params = new URLSearchParams();
  params.append("secret", RECAPTCHA_SECRET);
  params.append("response", token);
  params.append("remoteip", remoteIp);

  const googleRes = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await googleRes.json();
  return data;
};

const postFormulario = async (req, res) => {
  try {
    const { nombre, email, mensaje, captchaToken } = req.body;

    if (!captchaToken) {
      return res.status(400).json({
        error: "Token de reCaptcha es requerido",
      });
    }

    const captchaResult = await verifyCaptcha(captchaToken, req.ip);

    if (!captchaResult.success) {
      console.error("reCAPTCHA error:", captchaResult["error-codes"]);
      return res.status(403).json({ error: "Captcha inválido" });
    }

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
        detalles: {
          nombre: !nombre ? "Nombre es requerido" : null,
          email: !email ? "Email es requerido" : null,
          mensaje: !mensaje ? "Mensaje es requerido" : null,
        },
      });
    }

    const nombreTrimmed = nombre.trim();
    if (nombreTrimmed.length < 2) {
      return res.status(400).json({
        error: "El nombre debe tener al menos 2 caracteres",
      });
    }
    if (nombreTrimmed.length > 100) {
      return res.status(400).json({
        error: "El nombre no puede exceder 100 caracteres",
      });
    }

    const emailTrimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailTrimmed)) {
      return res.status(400).json({
        error: "Email inválido",
      });
    }
    if (emailTrimmed.length > 254) {
      return res.status(400).json({
        error: "El email es demasiado largo",
      });
    }

    const mensajeTrimmed = mensaje.trim();
    if (mensajeTrimmed.length < 10) {
      return res.status(400).json({
        error: "El mensaje debe tener al menos 10 caracteres",
      });
    }
    if (mensajeTrimmed.length > 500) {
      return res.status(400).json({
        error: "El mensaje no puede exceder 500 caracteres",
      });
    }

    const formulario = {
      id: Date.now().toString(),
      nombre: nombreTrimmed,
      email: emailTrimmed,
      mensaje: mensajeTrimmed,
      fecha_de_envio: new Date().toISOString(),
    };

    formularios.push(formulario);

    console.log("Nuevo mensaje recibido:");
    console.log("- Nombre:", formulario.nombre);
    console.log("- Email:", formulario.email);
    console.log("- Mensaje:", formulario.mensaje);

    // posible funcionalidad:
    // se me ocurre enviar formulario por email
    // se puede usar "nodemailer"
    // ej: await enviarEmail(formulario);

    res.status(201).json({
      success: true,
      mensaje: "Mensaje enviado correctamente",
      // mas adelante reducir info enviada, tal vez solo hace falta enviar id y fecha
      data: {
        id: formulario.id,
        nombre: formulario.nombre,
        email: formulario.email,
        mensaje: formulario.mensaje,
        fecha_de_envio: formulario.fecha_de_envio,
      },
    });
  } catch (error) {
    console.error("Error en /api/contacto:", error);
    res.status(500).json({
      error: "Error al procesar el mensaje.",
    });
  }
};

const getAllFormularios = (req, res) => {
  try {
    // si no es admin no deberia poder ver los formularios
    // aca va un middleware para verificacion que el usuario sea admin

    res.status(200).json({
      success: true,
      cantidad: formularios.length,
      formularios: formularios,
    });
  } catch (error) {
    console.error("Error en /api/contacto:", error);
    res.status(500).json({
      error: "Error al obtener formularios",
    });
  }
};

const getFormularioPorId = (req, res) => {
  try {
    const { id } = req.params;
    const formulario = formularios.find((f) => f.id === id);

    if (!formulario) {
      return res.status(404).json({ error: "Formulario no encontrado" });
    }

    res.status(200).json({
      success: true,
      formulario: formulario,
    });
  } catch (error) {
    console.error("Error en /api/contacto:", error);
    res.status(500).json({
      error: "Error al obtener formulario",
    });
  }
};

module.exports = { postFormulario, getAllFormularios, getFormularioPorId };
