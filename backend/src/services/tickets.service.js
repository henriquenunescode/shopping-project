const prisma = require("../config/prisma")

async function create(data) {
  return prisma.tickets.create({
    data: {
      user_fk: Number(data.user_fk),
      movie_fk: Number(data.movie_fk),
      sessao: data.sessao
    },
    include: {
      user: {
        select: {
          user_id: true,
          nome: true,
          email: true,
          google_id: true
        }
      },
      movie: true
    }
  })
}

async function findAll() {
  return prisma.tickets.findMany({
    include: {
      user: {
        select: {
          user_id: true,
          nome: true,
          email: true,
          google_id: true
        }
      },
      movie: true
    }
  })
}

async function findById(id) {
  return prisma.tickets.findUnique({
    where: {
      tickets_id: Number(id)
    },
    include: {
      user: {
        select: {
          user_id: true,
          nome: true,
          email: true,
          google_id: true
        }
      },
      movie: true
    }
  })
}

async function remove(id) {
  return prisma.tickets.delete({
    where: {
      tickets_id: Number(id)
    }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  remove
}