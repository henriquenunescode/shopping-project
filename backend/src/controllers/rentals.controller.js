const rentalsService = require("../services/rentals.service")

async function create(req, res, next) {
  try {
    const rental = await rentalsService.create(req.body)
    res.status(201).json(rental)
  } catch (err) {
    next(err)
  }
}

async function findAll(req, res, next) {
  try {
    const rentals = await rentalsService.findAll()
    res.json(rentals)
  } catch (err) {
    next(err)
  }
}

async function findById(req, res, next) {
  try {
    const rental = await rentalsService.findById(req.params.id)
    res.json(rental)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await rentalsService.remove(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  findAll,
  findById,
  remove
}