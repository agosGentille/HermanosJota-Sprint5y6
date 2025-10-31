const { verifyRecaptcha } = require("../controllers/CaptchaController");

const verifyCaptchaMiddleware = async (req, res, next) => {
  try {
    const token = req.body.captchaToken;

    if (!token) {
      return res.status(400).json({ error: "Token de reCaptcha es requerido" });
    }

    const result = await verifyRecaptcha(token, req.ip);

    if (!result.success) {
      console.error("reCAPTCHA error:", result["error-codes"]);
      return res.status(403).json({ error: "Captcha inválido" });
    }

    next();
  } catch (err) {
    console.error("Error en verifyCaptchaMiddleware:", err);
    res.status(500).json({ error: "Error verificando captcha" });
  }
};

module.exports = verifyCaptchaMiddleware;
