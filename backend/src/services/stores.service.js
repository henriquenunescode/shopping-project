const prisma = require("../config/prisma")

async function create(data) {
  return prisma.stores.create({ data })
}

async function findAll() {
  return prisma.stores.findMany()
}

async function findById(id) {
  return prisma.stores.findUnique({
    where: {
      store_id: Number(id)
    }
  })
}

async function update(id, data) {
  return prisma.stores.update({
    where: {
      store_id: Number(id)
    },
    data
  })
}

async function remove(id) {
  return prisma.stores.delete({
    where: {
      store_id: Number(id)
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