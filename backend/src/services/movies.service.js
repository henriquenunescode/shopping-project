const prisma = require("../config/prisma")

async function create(data) {
  return prisma.movies.create({
    data: {
      titulo: data.titulo,
      genero: data.genero,
      duracao: Number(data.duracao)
    }
  })
}

async function findAll() {
  return prisma.movies.findMany()
}

async function findById(id) {
  return prisma.movies.findUnique({
    where: {
      movies_id: Number(id)
    }
  })
}

async function update(id, data) {
  return prisma.movies.update({
    where: {
      movies_id: Number(id)
    },
    data: {
      ...(data.titulo !== undefined && { titulo: data.titulo }),
      ...(data.genero !== undefined && { genero: data.genero }),
      ...(data.duracao !== undefined && { duracao: Number(data.duracao) })
    }
  })
}

async function remove(id) {
  try {
    return await prisma.movies.delete({
      where: {
        movies_id: Number(id)
      }
    })
  } catch (error) {
    if (error.code === "P2003") {
      const customError = new Error(
        "Não é possível apagar este filme porque ele já possui ingressos ou locações vinculadas."
      )
      customError.statusCode = 400
      throw customError
    }

    throw error
  }
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
}