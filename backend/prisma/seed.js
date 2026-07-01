const bcrypt = require("bcryptjs")
const { PrismaClient } = require("../src/generated/prisma")

const prisma = new PrismaClient()

async function main() {
    await prisma.stores.upsert({
        where: {
            store_id: 3
        },
        update: {
            nome: "Cinema",
            tipo: "Entretenimento"
        },
        create: {
            store_id: 3,
            nome: "Cinema",
            tipo: "Entretenimento"
        }
    })

    async function criarOuAtualizarProdutoCinema(nome, preco, estoque) {
        const product = await prisma.products.findFirst({
            where: {
                nome,
                store_fk: 3
            }
        })

        if (product) {
            await prisma.products.update({
                where: {
                    product_id: product.product_id
                },
                data: {
                    preco,
                    estoque
                }
            })
        } else {
            await prisma.products.create({
                data: {
                    store_fk: 3,
                    nome,
                    preco,
                    estoque
                }
            })
        }
    }

    await criarOuAtualizarProdutoCinema("Ingresso Inteiro", 35.0, 100)
    await criarOuAtualizarProdutoCinema("Ingresso Meia", 17.5, 100)
    await criarOuAtualizarProdutoCinema("Refrigerante 500ml", 10.0, 100)
    await criarOuAtualizarProdutoCinema("Pipoca Grande", 25.0, 100)
    await criarOuAtualizarProdutoCinema("Pipoca Média", 20.0, 100)
    await criarOuAtualizarProdutoCinema("Pipoca Pequena", 15.0, 100)

    await prisma.stores.upsert({
        where: {
            store_id: 2
        },
        update: {
            nome: "Boutique Élite",
            tipo: "Moda"
        },
        create: {
            store_id: 2,
            nome: "Boutique Élite",
            tipo: "Moda"
        }
    })

    const product = await prisma.products.findFirst({
        where: {
            nome: "Camiseta",
            store_fk: 2
        }
    })

    if (!product) {
        await prisma.products.create({
            data: {
                store_fk: 2,
                nome: "Camiseta",
                preco: 49.9,
                estoque: 20
            }
        })
    }

    const existingMovie = await prisma.movies.findFirst({
        where: {
            titulo: "Matrix"
        }
    })

    if (existingMovie) {
        await prisma.movies.update({
            where: {
                movies_id: existingMovie.movies_id
            },
            data: {
                genero: "kids",
                duracao: 136
            }
        })
    } else {
        await prisma.movies.create({
            data: {
                titulo: "Matrix",
                genero: "kids",
                duracao: 136
            }
        })
    }

    const hashedPassword = await bcrypt.hash("123456", 10)

    await prisma.users.upsert({
        where: {
            email: "joao@gmail.com"
        },
        update: {
            nome: "Joao",
            tipo: "USER"
        },
        create: {
            nome: "Joao",
            email: "joao@gmail.com",
            senha: hashedPassword,
            tipo: "USER"
        }
    })

    const adminPassword = await bcrypt.hash("123456", 10)

    await prisma.users.upsert({
        where: {
            email: "gerente@geneva.com"
        },
        update: {
            nome: "Gerente",
            tipo: "ADMIN"
        },
        create: {
            nome: "Gerente",
            email: "gerente@geneva.com",
            senha: adminPassword,
            tipo: "ADMIN"
        }
    })

    let restauranteStore = await prisma.stores.findFirst({
        where: {
            nome: "Lem' Mar"
        }
    })

    if (restauranteStore) {
        restauranteStore = await prisma.stores.update({
            where: {
                store_id: restauranteStore.store_id
            },
            data: {
                nome: "Lem' Mar",
                tipo: "Gastronomia"
            }
        })
    } else {
        restauranteStore = await prisma.stores.create({
            data: {
                nome: "Lem' Mar",
                tipo: "Gastronomia"
            }
        })
    }
}

main()
    .then(async () => {
        console.log("Seed executado com sucesso")
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })