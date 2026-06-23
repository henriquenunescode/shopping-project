const prisma = require("../config/prisma")

async function create(data) {
  return prisma.rentals.create({
    data: {
      user_fk: Number(data.user_fk),
      movie_fk: Number(data.movie_fk),
      data_final: new Date(data.data_final)
    },
    include: {
      user: true,
      movie: true
    }
  })
}

async function findAll() {
  return prisma.rentals.findMany({
    include: {
      user: true,
      movie: true
    }
  })
}

async function findById(id) {
  return prisma.rentals.findUnique({
    where: {
      rental_id: Number(id)
    },
    include: {
      user: true,
      movie: true
    }
  })
}

async function remove(id) {
  return prisma.rentals.delete({
    where: {
      rental_id: Number(id)
    }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  remove
}