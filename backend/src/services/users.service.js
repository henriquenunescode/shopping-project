const prisma = require("../config/prisma")

async function create(data) {
  return prisma.users.create({
    data
  })
}

async function findAll() {
  return prisma.users.findMany()
}

async function findById(id) {
  return prisma.users.findUnique({
    where: {
      user_id: Number(id)
    }
  })
}

async function update(id, data) {
  return prisma.users.update({
    where: {
      user_id: Number(id)
    },
    data
  })
}

async function remove(id) {
  return prisma.users.delete({
    where: {
      user_id: Number(id)
    }
  })
}

async function findHistory(id) {
  return prisma.users.findUnique({
    where: {
      user_id: Number(id)
    },
    include: {
      orders: {
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      },
      tickets: {
        include: {
          movie: true
        }
      },
      rentals: {
        include: {
          movie: true
        }
      }
    }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  findHistory
}