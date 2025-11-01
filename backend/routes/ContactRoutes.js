const express = require("express");
const router = express.Router();
const verifyCaptcha = require("../middlewares/recaptchaMiddleware");
const {
  postFormulario,
  getAllFormularios,
  getFormularioPorId,
} = require("../controllers/ContactController");

router.post("/", verifyCaptcha, postFormulario);

router.get("/", getAllFormularios);

router.get("/:id", getFormularioPorId);

module.exports = router;
