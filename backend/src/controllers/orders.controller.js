const ordersService = require("../services/orders.service")

async function create(req, res, next) {
  try {
    const order = await ordersService.create(req.body)
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

async function findAll(req, res, next) {
  try {
    const orders = await ordersService.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

async function findById(req, res, next) {
  try {
    const order = await ordersService.findById(req.params.id)
    res.json(order)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await ordersService.remove(req.params.id)
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