const express = require("express");
const router = express.Router();
const {
  postFormulario,
  getAllFormularios,
  getFormularioPorId,
} = require("../controllers/ContactController");

router.post("/", postFormulario);

router.get("/", getAllFormularios);

router.get("/:id", getFormularioPorId);

module.exports = router;
