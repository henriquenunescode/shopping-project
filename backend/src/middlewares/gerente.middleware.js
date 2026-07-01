function gerenteMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Usuário não autenticado"
    })
  }

  if (req.user.tipo !== "ADMIN") {
    return res.status(403).json({
      message: "Acesso permitido apenas para gerentes"
    })
  }

  next()
}

module.exports = gerenteMiddleware
