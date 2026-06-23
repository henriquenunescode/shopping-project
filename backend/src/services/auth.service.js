const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const prisma = require("../config/prisma")

function removePassword(user) {
  const { senha, ...userWithoutPassword } = user
  return userWithoutPassword
}

async function register(data) {
  if (!data.nome || !data.email || !data.senha) {
    const error = new Error("Nome, email e senha são obrigatórios")
    error.statusCode = 400
    throw error
  }

  if (data.senha.length < 6) {
    const error = new Error("A senha precisa ter pelo menos 6 caracteres")
    error.statusCode = 400
    throw error
  }

  const existingUser = await prisma.users.findUnique({
    where: {
      email: data.email
    }
  })

  if (existingUser) {
    const error = new Error("Email já cadastrado")
    error.statusCode = 400
    throw error
  }

  const hashedPassword = await bcrypt.hash(data.senha, 10)

  const user = await prisma.users.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hashedPassword
    }
  })

  return removePassword(user)
}

async function login(data) {
  if (!data.email || !data.senha) {
    const error = new Error("Email e senha são obrigatórios")
    error.statusCode = 400
    throw error
  }

  const user = await prisma.users.findUnique({
    where: {
      email: data.email
    }
  })

  if (!user) {
    const error = new Error("Email ou senha inválidos")
    error.statusCode = 401
    throw error
  }

  const passwordIsValid = await bcrypt.compare(data.senha, user.senha)

  if (!passwordIsValid) {
    const error = new Error("Email ou senha inválidos")
    error.statusCode = 401
    throw error
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  )

  return {
    user: removePassword(user),
    token
  }
}

module.exports = {
  register,
  login
}