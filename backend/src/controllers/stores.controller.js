const storesService = require("../services/stores.service")

async function create(req, res, next) {
  try {
    const store = await storesService.create(req.body)

    res.status(201).json(store)
  } catch (err) {
    next(err)
  }
}

async function findAll(req, res, next) {
  try {
    const stores = await storesService.findAll()

    res.json(stores)
  } catch (err) {
    next(err)
  }
}

async function findById(req, res, next) {
  try {
    const store = await storesService.findById(req.params.id)

    res.json(store)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const store = await storesService.update(
      req.params.id,
      req.body
    )

    res.json(store)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await storesService.remove(req.params.id)

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