const workersService = require("../services/workers.service")

async function create(req, res, next) {
  try {
    const worker = await workersService.create(req.body)
    res.status(201).json(worker)
  } catch (err) {
    next(err)
  }
}

async function findAll(req, res, next) {
  try {
    const workers = await workersService.findAll()
    res.json(workers)
  } catch (err) {
    next(err)
  }
}

async function findById(req, res, next) {
  try {
    const worker = await workersService.findById(req.params.id)
    res.json(worker)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const worker = await workersService.update(req.params.id, req.body)
    res.json(worker)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await workersService.remove(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
}