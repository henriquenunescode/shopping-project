const ticketsService = require("../services/tickets.service")

async function create(req, res, next) {
  try {
    const ticket = await ticketsService.create(req.body)
    res.status(201).json(ticket)
  } catch (err) {
    next(err)
  }
}

async function findAll(req, res, next) {
  try {
    const tickets = await ticketsService.findAll()
    res.json(tickets)
  } catch (err) {
    next(err)
  }
}

async function findById(req, res, next) {
  try {
    const ticket = await ticketsService.findById(req.params.id)
    res.json(ticket)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await ticketsService.remove(req.params.id)
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