function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token || !token.startsWith("fake-token-")) {
    return res.status(401).json({ error: "No autorizado" });
  }

  req.userId = token.replace("fake-token-", "");
  next();
}

module.exports = authMiddleware;