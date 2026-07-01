import { createFormMenu, createFormChefs } from "../scripts/formToggle.js"

const RESTAURANTE_NOME = "Lem' Mar"

let restauranteStore = null
let dishs = []
let chefs = []

const linkMenu = document.querySelector("#menu")
const linkChefs = document.querySelector("#chefs")
const main = document.querySelector("#main-content")

function isGerenteAtual() {
    return window.isGerente && window.isGerente()
}

window.addEventListener("DOMContentLoaded", async () => {
    await carregarDadosRestaurante()
    route()
})

window.addEventListener("hashchange", route)

if (linkMenu) {
    linkMenu.addEventListener("click", (event) => {
        event.preventDefault()
        window.location.hash = "#menu"
    })
}

if (linkChefs) {
    linkChefs.addEventListener("click", (event) => {
        event.preventDefault()
        window.location.hash = "#chefs"
    })
}

function route() {
    const hash = window.location.hash

    if (hash === "#chefs") {
        renderPageChefs()
    } else {
        renderPageMenu()
        window.location.hash = "#menu"
    }
}

async function carregarDadosRestaurante() {
    try {
        const stores = await window.apiRequest("/stores")

        restauranteStore = stores.find((store) => {
            return store.nome === RESTAURANTE_NOME
        })

        if (!restauranteStore) {
            alert("Loja Lem' Mar não encontrada no banco.")
            return
        }

        const products = await window.apiRequest("/products")

        dishs = products
            .filter((product) => product.store_fk === restauranteStore.store_id)
            .map((product) => {
                return {
                    product_id: product.product_id,
                    name: product.nome,
                    price: Number(product.preco),
                    descrition: product.descricao || "Prato do restaurante",
                    category: product.categoria || "Pratos",
                    store_fk: product.store_fk,
                    estoque: product.estoque
                }
            })

        const workers = await window.apiRequest("/workers")

        chefs = workers
            .filter((worker) => worker.store_fk === restauranteStore.store_id)
            .map((worker) => {
                return {
                    worker_id: worker.worker_id,
                    name: worker.nome,
                    especialidade: worker.tipo
                }
            })
    } catch (error) {
        alert(error.message)
    }
}

function renderPageMenu() {
    main.replaceChildren()
    main.append(sectionMenu())
}

function renderPageChefs() {
    main.replaceChildren()
    main.append(sectionChefs())
}

function sectionMenu() {
    const section = createDiv()
    section.id = "section-menu"

    const div = createDiv()
    div.id = "container"

    const title = divTitleMenu()
    const content = divDishs()

    section.append(title, div, content)

    return section
}

function sectionChefs() {
    const section = createDiv()
    section.id = "section-chefs"

    const div = createDiv()
    div.id = "container"

    const title = divTitleChefs()
    const content = divChefs()

    section.append(title, div, content)

    return section
}

function divTitleMenu() {
    const div = createDiv()
    div.classList.add("title-section")

    const h2 = createH2("Menu")

    const button = createButton("+ Novo Prato")
    button.id = "new-dish"

    if (!isGerenteAtual()) {
        button.style.display = "none"
    } else {
        button.addEventListener("click", renderFormMenu)
    }

    div.append(h2, button)

    return div
}

function renderFormMenu() {
    const divContainer = document.querySelector("#container")

    divContainer.replaceChildren()
    divContainer.append(createFormMenu())

    submitMenu()
}

function submitMenu() {
    const formMenu = document.querySelector("#form-menu")

    formMenu.addEventListener("submit", async (event) => {
        event.preventDefault()

        const dados = getDishs(formMenu)

        const name = dados.name
        const price = dados.price
        const descrition = dados.descrition
        const category = dados.category

        if (!name || !price || !descrition || !category) {
            alert("Preencha os campos corretamente!")
            return
        }

        try {
            await window.apiRequest("/products", {
                method: "POST",
                body: JSON.stringify({
                    store_fk: restauranteStore.store_id,
                    nome: name,
                    preco: price,
                    estoque: 100,
                    descricao: descrition,
                    categoria: category
                })
            })

            await carregarDadosRestaurante()
            renderDishs()

            formMenu.reset()
            document.querySelector("input[name='name']").focus()
        } catch (error) {
            alert(error.message)
        }
    })
}

function divTitleChefs() {
    const div = createDiv()
    div.classList.add("title-section")

    const h2 = createH2("Chefs")

    const button = createButton("+ Novo Chef")
    button.id = "new-chef"

    if (!isGerenteAtual()) {
        button.style.display = "none"
    } else {
        button.addEventListener("click", renderFormChef)
    }

    div.append(h2, button)

    return div
}

function renderFormChef() {
    const divContainer = document.querySelector("#container")

    divContainer.replaceChildren()
    divContainer.append(createFormChefs())

    submitFormChef()
}

function submitFormChef() {
    const formChefs = document.querySelector("#form-chefs")

    formChefs.addEventListener("submit", async (event) => {
        event.preventDefault()

        const dados = getChefs(formChefs)

        const name = dados.name
        const especialidade = dados.especialidade

        if (!name || !especialidade) {
            alert("Preencha todos os campos corretamente!")
            return
        }

        try {
            await window.apiRequest("/workers", {
                method: "POST",
                body: JSON.stringify({
                    nome: name,
                    tipo: especialidade,
                    store_fk: restauranteStore.store_id
                })
            })

            await carregarDadosRestaurante()
            renderChef()

            formChefs.reset()
            document.querySelector("input[name='name']").focus()
        } catch (error) {
            alert(error.message)
        }
    })
}

function divDishs() {
    const divGrid = createDiv()
    divGrid.classList.add("grid-pratos")

    if (dishs.length === 0) {
        divGrid.innerHTML = `<p>Nenhum prato cadastrado.</p>`
        return divGrid
    }

    dishs.forEach((prato) => {
        const dish = newDish(prato)
        divGrid.appendChild(dish)
    })

    return divGrid
}

function newDish(prato) {
    const divPratos = createDiv()
    divPratos.classList.add("pratos")

    const divContainer = createDiv()
    divContainer.classList.add("info-prato")

    const divTitle = createDiv()
    divTitle.classList.add("name-category")

    const h3 = createH3(prato.name)
    const span = createSpan(prato.category.toUpperCase())

    divTitle.append(h3, span)

    const pDescrition = createP(prato.descrition)
    pDescrition.classList.add("descrition")

    const pPrice = createP(prato.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }))
    pPrice.classList.add("price")

    divContainer.append(divTitle, pDescrition, pPrice)

    const divIcon = createDiv()
    divIcon.classList.add("icon-remove")

    if (!isGerenteAtual()) {
        divIcon.style.display = "none"
    }

    const icon = createI()
    icon.className = "ti ti-trash"

    icon.addEventListener("click", async () => {
        const confirmar = confirm("Tem certeza que deseja remover este prato?")
        if (!confirmar) return

        try {
            await window.apiRequest(`/products/${prato.product_id}`, {
                method: "DELETE"
            })

            await carregarDadosRestaurante()
            renderDishs()
        } catch (error) {
            alert(error.message)
        }
    })

    divIcon.append(icon)
    divPratos.append(divContainer, divIcon)

    return divPratos
}

function getDishs(form) {
    const dados = new FormData(form)

    const name = dados.get("name")
    const price = parseFloat(dados.get("price"))
    const descrition = dados.get("descrition")
    const category = dados.get("category")

    return { name, price, descrition, category }
}

function renderDishs() {
    const divGrid = document.querySelector(".grid-pratos")

    if (!divGrid) return

    divGrid.replaceChildren()

    if (dishs.length === 0) {
        divGrid.innerHTML = `<p>Nenhum prato cadastrado.</p>`
        return
    }

    dishs.forEach((prato) => {
        const dish = newDish(prato)
        divGrid.appendChild(dish)
    })
}

function divChefs() {
    const divGrid = createDiv()
    divGrid.classList.add("grid-chefs")

    if (chefs.length === 0) {
        divGrid.innerHTML = `<p>Nenhum chef cadastrado.</p>`
        return divGrid
    }

    chefs.forEach((chef) => {
        const divChef = newChef(chef)
        divGrid.appendChild(divChef)
    })

    return divGrid
}

function getChefs(form) {
    const dados = new FormData(form)

    const name = dados.get("name")
    const especialidade = dados.get("especialidade")

    return { name, especialidade }
}

function renderChef() {
    const divGrid = document.querySelector(".grid-chefs")

    if (!divGrid) return

    divGrid.replaceChildren()

    if (chefs.length === 0) {
        divGrid.innerHTML = `<p>Nenhum chef cadastrado.</p>`
        return
    }

    chefs.forEach((chef) => {
        const divChef = newChef(chef)
        divGrid.appendChild(divChef)
    })
}

function newChef(chef) {
    const divChefs = createDiv()
    divChefs.classList.add("chefs")

    const divInfoChefs = createDiv()
    divInfoChefs.classList.add("info-chefs")

    const i = createI()
    i.className = "ti ti-chef-hat"

    const h3 = createH3(chef.name)
    const span = createSpan(chef.especialidade)

    divInfoChefs.append(i, h3, span)

    const divIcon = createDiv()
    divIcon.classList.add("icon-remove")

    if (!isGerenteAtual()) {
        divIcon.style.display = "none"
    }

    const icon = createI()
    icon.className = "ti ti-trash"

    icon.addEventListener("click", async () => {
        const confirmar = confirm("Tem certeza que deseja remover este chef?")
        if (!confirmar) return

        try {
            await window.apiRequest(`/workers/${chef.worker_id}`, {
                method: "DELETE"
            })

            await carregarDadosRestaurante()
            renderChef()
        } catch (error) {
            alert(error.message)
        }
    })

    divIcon.append(icon)
    divChefs.append(divInfoChefs, divIcon)

    return divChefs
}

function createDiv() {
    return document.createElement("div")
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
    return document.createElement("i")
}