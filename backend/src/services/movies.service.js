const prisma = require("../config/prisma")

async function create(data) {
  return prisma.movies.create({ data })
}

async function findAll() {
  return prisma.movies.findMany()
}

async function findById(id) {
  return prisma.movies.findUnique({
    where: {
      movie_id: Number(id)
    }
  })
}

async function update(id, data) {
  return prisma.movies.update({
    where: {
      movie_id: Number(id)
    },
    data
  })
}

async function remove(id) {
  return prisma.movies.delete({
    where: {
      movie_id: Number(id)
    }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
}