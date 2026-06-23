const productsService = require("../services/products.service")

async function create(req, res, next) {
  try {
    const product = await productsService.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}

async function findAll(req, res, next) {
  try {
    const products = await productsService.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
}

async function findById(req, res, next) {
  try {
    const product = await productsService.findById(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const product = await productsService.update(req.params.id, req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await productsService.remove(req.params.id)
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