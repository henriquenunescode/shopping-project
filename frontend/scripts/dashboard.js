const storesContainer = document.querySelector("#storesContainer")
const addStoreBtn = document.querySelector("#addStoreBtn")
const storeFormContainer = document.querySelector("#storeFormContainer")

const clickAlimentacao = document.querySelector("#alimentacao")
const clickKids = document.querySelector("#img-kids")
const clickCine = document.querySelector("#img-lazer")
const logoutBtn = document.querySelector("#logoutBtn")

const userName = document.querySelector("#userName")
const usuarioContainer = document.querySelector("#usuarioContainer")
const ordersContainer = document.querySelector("#ordersContainer")
const ticketsContainer = document.querySelector("#ticketsContainer")
const rentalsContainer = document.querySelector("#rentalsContainer")

const clearHistoryBtn = document.querySelector("#clearHistoryBtn")

if (clickAlimentacao) {
  clickAlimentacao.addEventListener("click", () => {
    window.location.href = "../pages/restaurante.html"
  })
}

if (clickKids) {
  clickKids.addEventListener("click", () => {
    window.location.href = "../pages/kids.html"
  })
}

if (clickCine) {
  clickCine.addEventListener("click", () => {
    window.location.href = "../pages/cinema.html"
  })
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "./login.html"
  })
}

if (addStoreBtn) {
  if (!window.isGerente()) {
    addStoreBtn.style.display = "none"
  }

  addStoreBtn.addEventListener("click", renderFormLoja)
}

if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", async () => {
    const user = window.getUser()

    if (!user) {
      window.location.href = "./login.html"
      return
    }

    const confirmar = confirm("Tem certeza que deseja limpar seu histórico?")

    if (!confirmar) {
      return
    }

    try {
      await window.apiRequest(`/users/${user.user_id}/history`, {
        method: "DELETE"
      })

      await carregarHistorico()

      alert("Histórico limpo com sucesso!")
    } catch (error) {
      alert(error.message)
    }
  })
}

function renderFormLoja() {
  if (!storeFormContainer) return

  storeFormContainer.innerHTML = `
    <form id="storeForm" class="container-form">
      <h3>Adicionar Loja</h3>
      <input type="text" name="nome" placeholder="Nome da loja" required>
      <input type="text" name="tipo" placeholder="Tipo da loja" required>
      <button type="submit">ADICIONAR</button>
    </form>
  `

  const storeForm = document.querySelector("#storeForm")

  storeForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(storeForm)
    const nome = formData.get("nome")
    const tipo = formData.get("tipo")

    try {
      await window.apiRequest("/stores", {
        method: "POST",
        body: JSON.stringify({ nome, tipo })
      })

      storeFormContainer.innerHTML = ""
      await carregarLojas()
    } catch (error) {
      alert(error.message)
    }
  })
}

async function carregarLojas() {
  if (!storesContainer) return

  try {
    const stores = await window.apiRequest("/stores")
    renderLojas(stores)
  } catch (error) {
    storesContainer.innerHTML = `<p>${error.message}</p>`
  }
}

function renderLojas(stores) {
  storesContainer.innerHTML = ""

  const lojasVisiveis = stores.filter((store) => {
    return (
      store.nome !== "Cinema" &&
      store.tipo !== "Entretenimento" &&
      store.nome !== "Lem' Mar" &&
      store.tipo !== "Gastronomia"
    )
  })

  lojasVisiveis.forEach((store) => {
    const card = document.createElement("div")

    card.id = escolherImagemLoja(store.tipo)
    card.classList.add("cards")

    card.innerHTML = `
      <div>
        <span>${store.tipo}</span>
        <h3>${store.nome}</h3>
      </div>
    `

    if (store.nome === "Boutique Élite") {
      card.addEventListener("click", () => {
        window.location.href = "./store.html"
      })
    }

    if (window.isGerente()) {
      const removeBtn = document.createElement("button")
      removeBtn.textContent = "REMOVER"
      removeBtn.classList.add("remove-store-btn")

      removeBtn.addEventListener("click", async (event) => {
        event.stopPropagation()

        const confirmar = confirm("Tem certeza que deseja remover esta loja?")
        if (!confirmar) return

        try {
          await window.apiRequest(`/stores/${store.store_id}`, {
            method: "DELETE"
          })

          await carregarLojas()
        } catch (error) {
          alert(error.message)
        }
      })

      card.appendChild(removeBtn)
    }

    storesContainer.appendChild(card)
  })
}

function escolherImagemLoja(tipo) {
  const tipoLower = tipo.toLowerCase()

  if (tipoLower.includes("moda")) return "img-boutique"
  if (tipoLower.includes("casa")) return "img-casa"
  if (tipoLower.includes("tecnologia")) return "img-tech"
  if (tipoLower.includes("beleza")) return "img-parfum"

  return "img-boutique"
}

async function carregarHistorico() {
  const user = window.getUser()

  if (!user) {
    window.location.href = "./login.html"
    return
  }

  userName.textContent = user.nome

  try {
    const historico = await window.apiRequest(`/users/${user.user_id}/history`)

    renderUsuario(historico)
    renderPedidos(historico.orders)
    renderTickets(historico.tickets)
    renderRentals(historico.rentals)
  } catch (error) {
    usuarioContainer.innerHTML = `<p>${error.message}</p>`
  }
}

function renderUsuario(user) {
  usuarioContainer.innerHTML = `
    <p><strong>Nome:</strong> ${user.nome}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Tipo:</strong> ${user.tipo === "ADMIN" ? "Gerente" : "Usuário padrão"}</p>
  `
}

function renderPedidos(orders) {
  if (!orders || orders.length === 0) {
    ordersContainer.innerHTML = `<p class="empty-history">Nenhum pedido encontrado.</p>`
    return
  }

  ordersContainer.innerHTML = ""

  orders.forEach((order) => {
    const div = document.createElement("div")
    div.classList.add("history-card")

    const itemsHtml = order.items.map((item) => {
      return `
        <li>
          ${item.product.nome} — ${item.quantidade}x — R$ ${item.preco_unitario}
        </li>
      `
    }).join("")

    div.innerHTML = `
      <h4>Pedido #${order.orders_id}</h4>
      <p><strong>Total:</strong> R$ ${order.total}</p>
      <ul>${itemsHtml}</ul>
    `

    ordersContainer.appendChild(div)
  })
}

function agruparPorChave(lista, criarChave) {
  const mapa = {}

  lista.forEach((item) => {
    const chave = criarChave(item)

    if (!mapa[chave]) {
      mapa[chave] = { item, quantidade: 1 }
    } else {
      mapa[chave].quantidade += 1
    }
  })

  return Object.values(mapa)
}

function renderTickets(tickets) {
  if (!tickets || tickets.length === 0) {
    ticketsContainer.innerHTML = `<p class="empty-history">Nenhum ingresso encontrado.</p>`
    return
  }

  ticketsContainer.innerHTML = ""

  const ticketsAgrupados = agruparPorChave(tickets, (ticket) => {
    return `${ticket.movie.titulo}-${ticket.sessao}`
  })

  ticketsAgrupados.forEach(({ item: ticket, quantidade }) => {
    const div = document.createElement("div")
    div.classList.add("history-card")

    div.innerHTML = `
      ${quantidade > 1 ? `<span class="history-count">x${quantidade}</span>` : ""}
      <h4>${ticket.movie.titulo}</h4>
      <p><strong>Sessão:</strong> ${ticket.sessao}</p>
    `

    ticketsContainer.appendChild(div)
  })
}

function renderRentals(rentals) {
  if (!rentals || rentals.length === 0) {
    rentalsContainer.innerHTML = `<p class="empty-history">Nenhuma locação encontrada.</p>`
    return
  }

  rentalsContainer.innerHTML = ""

  const rentalsAgrupadas = agruparPorChave(rentals, (rental) => {
    const data = new Date(rental.data_final).toLocaleDateString("pt-BR")
    return `${rental.movie.titulo}-${data}`
  })

  rentalsAgrupadas.forEach(({ item: rental, quantidade }) => {
    const div = document.createElement("div")
    div.classList.add("history-card")

    div.innerHTML = `
      ${quantidade > 1 ? `<span class="history-count">x${quantidade}</span>` : ""}
      <h4>${rental.movie.titulo}</h4>
      <p><strong>Entrega:</strong> ${new Date(rental.data_final).toLocaleDateString("pt-BR")}</p>
    `

    rentalsContainer.appendChild(div)
  })
}

carregarHistorico()
carregarLojas()

setInterval(carregarLojas, 10000)
