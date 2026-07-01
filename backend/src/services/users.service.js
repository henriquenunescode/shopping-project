const bcrypt = require("bcryptjs")
const prisma = require("../config/prisma")

const safeUserSelect = {
  user_id: true,
  nome: true,
  email: true,
  google_id: true,
  tipo: true
}

async function create(data) {
  const hashedPassword = await bcrypt.hash(data.senha, 10)

  return prisma.users.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
      google_id: data.google_id
    },
    select: safeUserSelect
  })
}

async function findAll() {
  return prisma.users.findMany({
    select: safeUserSelect
  })
}

async function findById(id) {
  return prisma.users.findUnique({
    where: {
      user_id: Number(id)
    },
    select: safeUserSelect
  })
}

async function update(id, data) {
  const updateData = { ...data }

  delete updateData.tipo
  delete updateData.user_id

  if (data.senha) {
    updateData.senha = await bcrypt.hash(data.senha, 10)
  }

  return prisma.users.update({
    where: {
      user_id: Number(id)
    },
    data: updateData,
    select: safeUserSelect
  })
}

async function remove(id) {
  return prisma.users.delete({
    where: {
      user_id: Number(id)
    },
    select: safeUserSelect
  })
}

async function findHistory(id) {
  return prisma.users.findUnique({
    where: {
      user_id: Number(id)
    },
    select: {
      ...safeUserSelect,
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

async function clearHistory(id) {
  const userId = Number(id)

  return prisma.$transaction(async (tx) => {
    const orders = await tx.orders.findMany({
      where: {
        user_fk: userId
      },
      select: {
        orders_id: true
      }
    })

    const orderIds = orders.map((order) => order.orders_id)

    if (orderIds.length > 0) {
      await tx.order_items.deleteMany({
        where: {
          order_fk: {
            in: orderIds
          }
        }
      })
    }

    await tx.orders.deleteMany({
      where: {
        user_fk: userId
      }
    })

    await tx.tickets.deleteMany({
      where: {
        user_fk: userId
      }
    })

    await tx.rentals.deleteMany({
      where: {
        user_fk: userId
      }
    })

    return {
      message: "Histórico limpo com sucesso"
    }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  findHistory,
  clearHistory
}