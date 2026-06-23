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
    const history = await usersService.findHistory(
      req.params.id
    )

    res.json(history)
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
  findHistory
}