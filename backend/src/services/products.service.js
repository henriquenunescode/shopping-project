const prisma = require("../config/prisma")

async function create(data) {
  return prisma.products.create({
    data: {
      store_fk: Number(data.store_fk),
      nome: data.nome,
      preco: Number(data.preco),
      estoque: Number(data.estoque),
      descricao: data.descricao,
      categoria: data.categoria
    }
  })
}

async function findAll() {
  return prisma.products.findMany({
    include: {
      store: true
    }
  })
}

async function findById(id) {
  return prisma.products.findUnique({
    where: {
      product_id: Number(id)
    },
    include: {
      store: true
    }
  })
}

async function update(id, data) {
  return prisma.products.update({
    where: {
      product_id: Number(id)
    },
    data: {
      ...(data.store_fk !== undefined && { store_fk: Number(data.store_fk) }),
      ...(data.nome !== undefined && { nome: data.nome }),
      ...(data.preco !== undefined && { preco: Number(data.preco) }),
      ...(data.estoque !== undefined && { estoque: Number(data.estoque) }),
      ...(data.descricao !== undefined && { descricao: data.descricao }),
      ...(data.categoria !== undefined && { categoria: data.categoria })
    }
  })
}
async function remove(id) {
  return prisma.products.delete({
    where: {
      product_id: Number(id)
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