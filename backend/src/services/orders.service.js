const prisma = require("../config/prisma")

async function create(data) {
  const user_fk = Number(data.user_fk)
  const items = data.items

  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("O pedido precisa ter pelo menos um item")
    error.statusCode = 400
    throw error
  }

  return prisma.$transaction(async (tx) => {
    const productIds = items.map((item) => Number(item.product_fk))

    const products = await tx.products.findMany({
      where: {
        product_id: {
          in: productIds
        }
      }
    })

    if (products.length !== items.length) {
      const error = new Error("Um ou mais produtos não foram encontrados")
      error.statusCode = 404
      throw error
    }

    let total = 0

    for (const item of items) {
      const product = products.find(
        (product) => product.product_id === Number(item.product_fk)
      )

      const quantidade = Number(item.quantidade)

      if (product.estoque < quantidade) {
        const error = new Error(`Estoque insuficiente para o produto ${product.nome}`)
        error.statusCode = 400
        throw error
      }

      total += Number(product.preco) * quantidade
    }

    const order = await tx.orders.create({
      data: {
        user_fk,
        total
      }
    })

    for (const item of items) {
      const product = products.find(
        (product) => product.product_id === Number(item.product_fk)
      )

      const quantidade = Number(item.quantidade)

      await tx.order_items.create({
        data: {
          order_fk: order.orders_id,
          product_fk: product.product_id,
          quantidade,
          preco_unitario: product.preco
        }
      })

      await tx.products.update({
        where: {
          product_id: product.product_id
        },
        data: {
          estoque: {
            decrement: quantidade
          }
        }
      })
    }

    return tx.orders.findUnique({
      where: {
        orders_id: order.orders_id
      },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    })
  })
}

async function findAll() {
  return prisma.orders.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  })
}

async function findById(id) {
  return prisma.orders.findUnique({
    where: {
      orders_id: Number(id)
    },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  })
}

async function remove(id) {
  return prisma.orders.delete({
    where: {
      orders_id: Number(id)
    }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  remove
}