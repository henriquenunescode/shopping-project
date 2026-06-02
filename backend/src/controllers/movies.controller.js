const moviesService = require("../services/movies.service")

async function create(req, res, next) {
  try {
    const movie = await moviesService.create(req.body)

    res.status(201).json(movie)
  } catch (err) {
    next(err)
  }
}

async function findAll(req, res, next) {
  try {
    const movies = await moviesService.findAll()

    res.json(movies)
  } catch (err) {
    next(err)
  }
}

async function findById(req, res, next) {
  try {
    const movie = await moviesService.findById(req.params.id)

    res.json(movie)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const movie = await moviesService.update(
      req.params.id,
      req.body
    )

    res.json(movie)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    await moviesService.remove(req.params.id)

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