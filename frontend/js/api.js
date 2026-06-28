const API_URL = "http://localhost:3000"

function getToken() {
  return localStorage.getItem("token")
}

function getUser() {
  const user = localStorage.getItem("user")

  if (!user) {
    return null
  }

  return JSON.parse(user)
}

async function apiRequest(endpoint, options = {}) {
  const token = getToken()

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || "Erro na requisição")
  }

  return data
}