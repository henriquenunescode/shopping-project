import { createFormCine } from "../scripts/formToggle.js"

let movies = []
let tickets = []

const linkMovie = document.querySelector("#movies")
const linkTickets = document.querySelector("#tickets")

function isGerenteAtual() {
    return window.isGerente && window.isGerente()
}

async function carregarProdutosCinema() {
    try {
        const products = await window.apiRequest("/products")

        tickets = products
            .filter((product) => Number(product.store_fk) === 3)
            .map((product) => {
                return {
                    product_fk: product.product_id,
                    name: product.nome,
                    type: definirTipoProdutoCinema(product.nome),
                    price: Number(product.preco),
                    estoque: product.estoque
                }
            })
    } catch (error) {
        alert(error.message)
    }
}

function definirTipoProdutoCinema(nome) {
    const nomeLower = nome.toLowerCase()

    if (nomeLower.includes("ingresso")) {
        return "Ingresso"
    }

    if (nomeLower.includes("refrigerante")) {
        return "Bebida"
    }

    return "Alimento"
}

async function carregarMoviesDoBanco() {
    try {
        const moviesFromApi = await window.apiRequest("/movies")

        movies = moviesFromApi.map((movie) => {
            return {
                id: movie.movies_id,
                name: movie.titulo,
                duration: movie.duracao,
                category: movie.genero
            }
        })
    } catch (error) {
        alert(error.message)
    }
}

async function route() {
    const hash = window.location.hash

    if (hash === "#tickets") {
        await carregarProdutosCinema()
        renderPageTickets()
        return
    }

    if (hash !== "#movies") {
        window.location.hash = "#movies"
        return
    }

    await carregarMoviesDoBanco()
    renderPageMovie()
}

window.addEventListener("DOMContentLoaded", route)
window.addEventListener("hashchange", route)

if (linkTickets) {
    linkTickets.addEventListener("click", (event) => {
        event.preventDefault()
        window.location.hash = "#tickets"
    })
}

if (linkMovie) {
    linkMovie.addEventListener("click", (event) => {
        event.preventDefault()
        window.location.hash = "#movies"
    })
}

async function deletarFilme(movieId) {
    const confirmar = confirm("Tem certeza que deseja apagar este filme?")

    if (!confirmar) {
        return
    }

    try {
        await window.apiRequest(`/movies/${movieId}`, {
            method: "DELETE"
        })

        await carregarMoviesDoBanco()
        renderPageMovie()
    } catch (error) {
        alert(error.message)
    }
}

function renderPageTickets() {
    const main = document.querySelector("#main-content")

    main.replaceChildren()
    main.append(sectionTicket())
}

function renderPageMovie() {
    const main = document.querySelector("#main-content")

    main.replaceChildren()
    main.append(sectionMovie())
}

function sectionTicket() {
    const section = document.createElement("section")
    section.id = "section-tickets"

    const title = divTitleTicket()
    const content = divTickets()

    section.append(title, content)

    return section
}

function sectionMovie() {
    const section = document.createElement("section")
    section.id = "section-filmes"

    const div = createDiv()
    div.id = "container"

    const title = divTitleMovie()
    const content = divMovies()

    section.append(title, div, content)

    return section
}

function divTitleTicket() {
    const div = createDiv()
    div.classList.add("title-section")

    const h2 = createH2("Pipocas e Ingressos")

    div.appendChild(h2)

    return div
}

function divTitleMovie() {
    const div = createDiv()
    div.classList.add("title-section")

    const h2 = createH2("Em Cartaz")

    const button = createButton("+ Novo Filme")
    button.id = "new-movie"

    if (!isGerenteAtual()) {
        button.style.display = "none"
    } else {
        button.addEventListener("click", renderFormCine)
    }

    div.append(h2, button)

    return div
}

function renderFormCine() {
    const divContainer = document.querySelector("#container")

    divContainer.replaceChildren()
    divContainer.append(createFormCine())

    submitFormMovies()
}

function submitFormMovies() {
    const formCine = document.querySelector("#form-cine")

    formCine.addEventListener("submit", async (event) => {
        event.preventDefault()

        const dados = getMovies(formCine)

        const name = dados.name
        const duration = dados.duration
        const category = dados.category

        if (!name || !duration || !category) {
            alert("Preencha todos os campos corretamente!")
            return
        }

        try {
            await window.apiRequest("/movies", {
                method: "POST",
                body: JSON.stringify({
                    titulo: name,
                    genero: category,
                    duracao: Number(duration)
                })
            })

            await carregarMoviesDoBanco()
            renderPageMovie()

            alert("Filme cadastrado com sucesso!")
        } catch (error) {
            alert(error.message)
        }
    })
}

function divTickets() {
    const divGrid = createDiv()
    divGrid.classList.add("grid-tickets")

    tickets.forEach((ticket) => {
        const divTicket = createDiv()
        divTicket.classList.add("tickets")

        const divInfo = createDiv()
        divInfo.classList.add("info")

        const h3 = createH3(ticket.name)
        const p = createP(ticket.type)
        const span = createSpan(ticket.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }))

        divInfo.append(h3, p, span)

        const divButton = createDiv()
        divButton.classList.add("add-button")

        const button = createButton("COMPRAR")

        if (ticket.estoque <= 0) {
            button.disabled = true
            button.textContent = "SEM ESTOQUE"
        }

        button.addEventListener("click", () => {
            comprarProdutoCinema(ticket.product_fk)
        })

        divButton.append(button)
        divTicket.append(divInfo, divButton)
        divGrid.append(divTicket)
    })

    return divGrid
}

function divMovies() {
    const divGrid = createDiv()
    divGrid.classList.add("grid-filmes")

    movies.forEach((movie, index) => {
        const filme = newMovie(movie, index)
        divGrid.appendChild(filme)
    })

    return divGrid
}

function renderMovies() {
    const divGrid = document.querySelector(".grid-filmes")

    if (!divGrid) return

    divGrid.replaceChildren()

    movies.forEach((movie, index) => {
        const filme = newMovie(movie, index)
        divGrid.appendChild(filme)
    })
}

function newMovie(movie, index) {
    const divFilme = createDiv()
    divFilme.classList.add("filmes")

    const divInfoBanner = createDiv()
    divInfoBanner.classList.add("banner-info")

    const divBanner = createDiv()
    divBanner.id = "banner"

    const i = createI()
    i.className = "ti ti-trash"

    if (!isGerenteAtual()) {
        i.style.display = "none"
    }

    i.addEventListener("click", () => {
        deletarFilme(movie.id)
    })

    divBanner.append(i)

    const divInfo = createDiv()
    divInfo.classList.add("info")

    const h3 = createH3(movie.name)
    const span = createSpan(`${movie.duration} min`)

    const divSessions = createDiv()
    divSessions.classList.add("session")

    const p1 = createP("14:00")
    const p2 = createP("18:30")
    const p3 = createP("20:00")

    divSessions.append(p1, p2, p3)

    const buttonComprar = createButton("COMPRAR INGRESSO")
    buttonComprar.addEventListener("click", () => comprarIngresso(movie.id))

    const buttonAlugar = createButton("ALUGAR FILME")
    buttonAlugar.addEventListener("click", () => alugarFilme(movie.id))

    divInfo.append(h3, span, divSessions, buttonComprar, buttonAlugar)
    divInfoBanner.append(divBanner, divInfo)
    divFilme.append(divInfoBanner)

    return divFilme
}

function getMovies(form) {
    const dados = new FormData(form)

    const name = dados.get("name")
    const duration = dados.get("duration")
    const category = dados.get("category")

    return { name, duration, category }
}

async function comprarIngresso(movieId) {
    const user = window.getUser()

    if (!user) {
        alert("Você precisa estar logado")
        window.location.href = "./login.html"
        return
    }

    try {
        await window.apiRequest("/tickets", {
            method: "POST",
            body: JSON.stringify({
                user_fk: user.user_id,
                movie_fk: movieId,
                sessao: "20:30"
            })
        })

        alert("Ingresso comprado com sucesso!")
    } catch (error) {
        alert(error.message)
    }
}

async function alugarFilme(movieId) {
    const user = window.getUser()

    if (!user) {
        alert("Você precisa estar logado")
        window.location.href = "./login.html"
        return
    }

    try {
        await window.apiRequest("/rentals", {
            method: "POST",
            body: JSON.stringify({
                user_fk: user.user_id,
                movie_fk: movieId,
                data_final: "2026-06-20"
            })
        })

        alert("Filme alugado com sucesso!")
    } catch (error) {
        alert(error.message)
    }
}

async function comprarProdutoCinema(product_fk) {
    const user = window.getUser()

    if (!user) {
        alert("Você precisa estar logado")
        window.location.href = "./login.html"
        return
    }

    try {
        await window.apiRequest("/orders", {
            method: "POST",
            body: JSON.stringify({
                user_fk: user.user_id,
                items: [
                    {
                        product_fk,
                        quantidade: 1
                    }
                ]
            })
        })

        alert("Compra realizada com sucesso!")

        await carregarProdutosCinema()
        renderPageTickets()
    } catch (error) {
        alert(error.message)
    }
}

function createDiv() {
    const div = document.createElement("div")
    return div
}

function createH2(text) {
    const h2 = document.createElement("h2")
    h2.textContent = text
    return h2
}

function createButton(text) {
    const button = document.createElement("button")
    button.textContent = text
    return button
}

function createH3(text) {
    const h3 = document.createElement("h3")
    h3.textContent = text
    return h3
}

function createSpan(text) {
    const span = document.createElement("span")
    span.textContent = text
    return span
}

function createP(text) {
    const p = document.createElement("p")
    p.textContent = text
    return p
}

function createI() {
    const i = document.createElement("i")
    return i
}