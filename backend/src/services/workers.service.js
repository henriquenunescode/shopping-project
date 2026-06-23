const prisma = require("../config/prisma")

async function create(data) {
  return prisma.workers.create({
    data: {
      nome: data.nome,
      tipo: data.tipo,
      store_fk: Number(data.store_fk)
    }
  })
}

async function findAll() {
  return prisma.workers.findMany({
    include: {
      store: true
    }
  })
}

async function findById(id) {
  return prisma.workers.findUnique({
    where: {
      worker_id: Number(id)
    },
    include: {
      store: true
    }
  })
}

async function update(id, data) {
  return prisma.workers.update({
    where: {
      worker_id: Number(id)
    },
    data: {
      ...(data.nome !== undefined && { nome: data.nome }),
      ...(data.tipo !== undefined && { tipo: data.tipo }),
      ...(data.store_fk !== undefined && { store_fk: Number(data.store_fk) })
    }
  })
}

async function remove(id) {
  return prisma.workers.delete({
    where: {
      worker_id: Number(id)
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