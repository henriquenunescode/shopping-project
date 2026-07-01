const usersService = require("../services/users.service")

async function create(req, res, next) {
  try {
    const user = await usersService.create(req.body)

    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

async function findAll(req, res, next) {
  try {
    const users = await usersService.findAll()

    res.json(users)
  } catch (err) {
    next(err)
  }
}

async function findById(req, res, next) {
  try {
    const user = await usersService.findById(req.params.id)

    res.json(user)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    if (req.user.tipo !== "ADMIN" && Number(req.params.id) !== Number(req.user.user_id)) {
      return res.status(403).json({
        message: "Você só pode atualizar o seu próprio usuário"
      })
    }

    const user = await usersService.update(
      req.params.id,
      req.body
    )

    res.json(user)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await usersService.remove(req.params.id)

    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

async function findHistory(req, res, next) {
  try {
    if (req.user.tipo !== "ADMIN" && Number(req.params.id) !== Number(req.user.user_id)) {
      return res.status(403).json({
        message: "Você só pode acessar o seu próprio histórico"
      })
    }

    const history = await usersService.findHistory(
      req.params.id
    )

    res.json(history)
  } catch (err) {
    next(err)
  }
}

async function clearHistory(req, res, next) {
  try {
    if (req.user.tipo !== "ADMIN" && Number(req.params.id) !== Number(req.user.user_id)) {
      return res.status(403).json({
        message: "Você só pode limpar o seu próprio histórico"
      })
    }

    const result = await usersService.clearHistory(req.params.id)

    res.json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  findHistory,
  clearHistory
}