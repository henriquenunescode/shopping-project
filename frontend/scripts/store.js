import { createFormProducts, createFormFuncionario } from "./formToggle.js"

let products = []
let funcionarios = []

const STORE_ID = 2

const listCart = document.querySelector(".list-cart")
const cartTotal = document.querySelector(".cart-total")
const cartCount = document.querySelector(".link-button button span")
const finalizarCompraBtn = document.querySelector(".comprar")

const cartAside = document.querySelector(".cart-products")
const openCartBtn = document.querySelector(".link-button button")
const closeCartBtn = document.querySelector(".title-cart .ti-x")

const linkProducts = document.querySelector("#products")
const linkFuncionarios = document.querySelector("#funcionarios")

window.addEventListener("DOMContentLoaded", route)
window.addEventListener("hashchange", route)

linkFuncionarios.addEventListener("click", (event) => {
    event.preventDefault()
    window.location.hash = "#funcionarios"
})

linkProducts.addEventListener("click", (event) => {
    event.preventDefault()
    window.location.hash = "#products"
})

openCartBtn.addEventListener("click", () => {
    cartAside.classList.add("active")
})

closeCartBtn.addEventListener("click", () => {
    cartAside.classList.remove("active")
})

if (finalizarCompraBtn) {
    finalizarCompraBtn.addEventListener("click", finalizarPedido)
}

async function route() {
    const hash = window.location.hash

    if (hash === "#funcionarios") {
        await loadFuncionarios()
        renderPageFuncionarios()
    } else {
        await loadProducts()
        renderPageProducts()
        window.location.hash = "#products"
    }
}

async function loadProducts() {
    products = await apiRequest("/products")
}

async function loadFuncionarios() {
    funcionarios = await apiRequest("/workers")
}

function renderPageFuncionarios() {
    const main = document.querySelector("#main-content")

    limparConteudoSemApagarCarrinho()

    main.append(sectionFuncionario())
}

function renderPageProducts() {
    const main = document.querySelector("#main-content")

    limparConteudoSemApagarCarrinho()

    main.append(sectionProduct())
}

function limparConteudoSemApagarCarrinho() {
    const main = document.querySelector("#main-content")

    const sections = main.querySelectorAll("section")

    sections.forEach((section) => {
        section.remove()
    })
}

function sectionFuncionario() {
    const section = document.createElement("section")
    section.id = "section-funcionarios"

    const div = createDiv()
    div.id = "container"

    const title = divTitleFuncionario()
    const content = divFuncionarios()

    section.append(title, div, content)

    return section
}

function sectionProduct() {
    const section = document.createElement("section")
    section.id = "view-products"

    const div = createDiv()
    div.id = "container"

    const title = divTitleProduct()
    const content = divProducts()

    section.append(title, div, content)

    return section
}

function divTitleFuncionario() {
    const div = createDiv()
    div.classList.add("title-section")

    const h2 = createH2("Funcionários")

    const button = createButton("+ Novo Funcionário")
    button.id = "new-funcionario"
    button.addEventListener("click", renderFormFuncionario)

    div.append(h2, button)

    return div
}

function divTitleProduct() {
    const div = createDiv()
    div.classList.add("title-section")

    const h2 = createH2("Produtos")

    const button = createButton("+ Novo Produto")
    button.id = "new-product"
    button.addEventListener("click", renderFormProduct)

    div.append(h2, button)

    return div
}

function renderFormFuncionario() {
    const divContainer = document.querySelector("#container")

    divContainer.replaceChildren()
    divContainer.append(createFormFuncionario())

    submitFormFuncionario()
}

function renderFormProduct() {
    const divContainer = document.querySelector("#container")

    divContainer.replaceChildren()
    divContainer.append(createFormProducts())

    submitFormProduct()
}

function submitFormFuncionario() {
    const formFuncionario = document.querySelector("#form-funcionario")

    formFuncionario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const dados = getFuncionario(formFuncionario)

        const nome = dados.name
        const tipo = dados.cargo

        if (!nome || !tipo) {
            alert("Preencha os campos corretamente!")
            return
        }

        try {
            await apiRequest("/workers", {
                method: "POST",
                body: JSON.stringify({
                    nome,
                    tipo,
                    store_fk: STORE_ID
                })
            })

            await loadFuncionarios()
            renderFuncionarios()

            formFuncionario.reset()
            document.querySelector("input[name='name']").focus()
        } catch (error) {
            alert(error.message)
        }
    })
}

function submitFormProduct() {
    const formProduct = document.querySelector("#form-product")

    formProduct.addEventListener("submit", async (event) => {
        event.preventDefault()

        const dados = getProduct(formProduct)

        const nome = dados.name
        const preco = dados.price
        const estoque = dados.stock

        if (!nome || !preco || !estoque) {
            alert("Preencha todos os campos corretamente!")
            return
        }

        try {
            await apiRequest("/products", {
                method: "POST",
                body: JSON.stringify({
                    store_fk: STORE_ID,
                    nome,
                    preco,
                    estoque
                })
            })

            await loadProducts()
            renderProducts()

            formProduct.reset()
            document.querySelector("input[name='name']").focus()
        } catch (error) {
            alert(error.message)
        }
    })
}

function divFuncionarios() {
    const divGrid = createDiv()
    divGrid.classList.add("grid-funcionarios")

    funcionarios.forEach((funcionario) => {
        const divFuncionario = newFuncionario(funcionario)
        divGrid.append(divFuncionario)
    })

    return divGrid
}

function divProducts() {
    const divGrid = createDiv()
    divGrid.classList.add("grid-products")

    products.forEach((product) => {
        const divProduct = newProduct(product)
        divGrid.append(divProduct)
    })

    return divGrid
}

function getFuncionario(form) {
    const dados = new FormData(form)

    const name = dados.get("name")
    const cargo = dados.get("cargo")
    const email = dados.get("email")

    return { name, cargo, email }
}

function getProduct(form) {
    const dados = new FormData(form)

    const name = dados.get("name")
    const price = parseFloat(dados.get("price"))
    const reference = dados.get("reference")
    const stock = parseInt(dados.get("stock"))
    const type = dados.get("type")

    return { name, price, reference, stock, type }
}

function renderFuncionarios() {
    const divGrid = document.querySelector(".grid-funcionarios")

    divGrid.replaceChildren()

    funcionarios.forEach((funcionario) => {
        const f = newFuncionario(funcionario)
        divGrid.appendChild(f)
    })
}

function renderProducts() {
    const divGrid = document.querySelector(".grid-products")

    divGrid.replaceChildren()

    products.forEach((product) => {
        const produto = newProduct(product)
        divGrid.appendChild(produto)
    })
}

function newFuncionario(funcionario) {
    const divFuncionario = createDiv()
    divFuncionario.classList.add("funcionario")

    const divInfoFuncionario = createDiv()
    divInfoFuncionario.classList.add("info-funcionario")

    const h3 = createH3(funcionario.nome)
    const span = createSpan(funcionario.tipo)

    divInfoFuncionario.append(h3, span)

    const divRemove = createDiv()
    divRemove.classList.add("icon-remove")

    const i = createI()
    i.className = "ti ti-trash"
    divRemove.append(i)

    divRemove.addEventListener("click", async () => {
        try {
            await apiRequest(`/workers/${funcionario.worker_id}`, {
                method: "DELETE"
            })

            await loadFuncionarios()
            renderFuncionarios()
        } catch (error) {
            alert(error.message)
        }
    })

    divFuncionario.append(divInfoFuncionario, divRemove)

    return divFuncionario
}

function newProduct(product) {
    const divProduct = createDiv()
    divProduct.classList.add("product")

    const img = document.createElement("img")
    img.src = "../assets/images/kids.jpg"
    img.alt = product.nome

    const divInfoProduct = createDiv()
    divInfoProduct.classList.add("info-product")

    const h3 = createH3(product.nome)

    const price = createP(Number(product.preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }))
    price.classList.add("price")

    const stock = createP("Estoque: " + product.estoque)
    stock.classList.add("stock")

    divInfoProduct.append(h3, price, stock)

    const select = createSelect("quantity", "quantity", [
        "Selecionar a quantidade",
        "1",
        "2",
        "3",
        "4",
        "5"
    ])

    const divButtons = createDiv()
    divButtons.classList.add("buttons")

    const buttonAdd = createButton("Adicionar ao carrinho")
    buttonAdd.classList.add("add")

    if (product.estoque <= 0) {
        buttonAdd.disabled = true
        buttonAdd.textContent = "Sem estoque"
    }

    buttonAdd.addEventListener("click", () => {
        if (product.estoque <= 0) {
            alert("Produto sem estoque")
            return
        }

        const quantidade = Number(select.value)

        if (!quantidade) {
            alert("Selecione uma quantidade")
            return
        }

        if (quantidade > product.estoque) {
            alert("Quantidade maior que o estoque disponível")
            return
        }

        adicionarAoCarrinho(product, quantidade)
    })

    const buttonRemove = createButtonIcon()
    buttonRemove.classList.add("icon-remove")

    const i = createI()
    i.className = "ti ti-trash"
    buttonRemove.append(i)

    buttonRemove.addEventListener("click", async () => {
        try {
            await apiRequest(`/products/${product.product_id}`, {
                method: "DELETE"
            })

            await loadProducts()
            renderProducts()
        } catch (error) {
            alert(error.message)
        }
    })

    divButtons.append(buttonAdd, buttonRemove)
    divProduct.append(img, divInfoProduct, select, divButtons)

    return divProduct
}

function adicionarAoCarrinho(product, quantidade) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    const itemExistente = carrinho.find((item) => {
        return item.product_fk === product.product_id
    })

    if (itemExistente) {
        itemExistente.quantidade += quantidade
    } else {
        carrinho.push({
            product_fk: product.product_id,
            nome: product.nome,
            preco: Number(product.preco),
            quantidade
        })
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    renderCarrinho()

    alert("Produto adicionado ao carrinho")
}

function renderCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    listCart.replaceChildren()

    if (carrinho.length === 0) {
        listCart.innerHTML = "<p>Carrinho vazio</p>"
        cartTotal.textContent = "R$ 0,00"
        cartCount.textContent = "0"
        return
    }

    let total = 0
    let quantidadeTotal = 0

    carrinho.forEach((item) => {
        total += item.preco * item.quantidade
        quantidadeTotal += item.quantidade

        const divProduct = document.createElement("div")
        divProduct.classList.add("product")

        divProduct.innerHTML = `
      <div class="image">
        <div class="remove">
          <i class="ti ti-trash"></i>
        </div>
      </div>

      <div class="name">
        <h3>${item.nome}</h3>
      </div>

      <div class="price">
        <span>${item.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}</span>
      </div>

      <div class="quantity">
        <div class="minus-maximus">
            <i class="ti ti-plus plus-btn"></i>
            <span>${item.quantidade}</span>
            <i class="ti ti-minus minus-btn"></i>
        </div>
      </div>
    `

        const removeBtn = divProduct.querySelector(".remove")
        const plusBtn = divProduct.querySelector(".plus-btn")
        const minusBtn = divProduct.querySelector(".minus-btn")

        plusBtn.addEventListener("click", () => {
            aumentarQuantidade(item.product_fk)
        })

        minusBtn.addEventListener("click", () => {
            diminuirQuantidade(item.product_fk)
        })

        removeBtn.addEventListener("click", () => {
            removerDoCarrinho(item.product_fk)
        })

        listCart.appendChild(divProduct)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCount.textContent = quantidadeTotal
}

function removerDoCarrinho(product_fk) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    carrinho = carrinho.filter((item) => {
        return item.product_fk !== product_fk
    })

    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    renderCarrinho()
}

function aumentarQuantidade(product_fk) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    const item = carrinho.find((item) => {
        return item.product_fk === product_fk
    })

    if (item) {
        item.quantidade += 1
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    renderCarrinho()
}

function diminuirQuantidade(product_fk) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    const item = carrinho.find((item) => {
        return item.product_fk === product_fk
    })

    if (item) {
        item.quantidade -= 1
    }

    carrinho = carrinho.filter((item) => {
        return item.quantidade > 0
    })

    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    renderCarrinho()
}

function createSelect(name, id, options) {
    const select = document.createElement("select")
    select.name = name
    select.id = id

    options.forEach((optionText) => {
        const option = document.createElement("option")
        option.value = optionText.toLowerCase()
        option.textContent = optionText

        select.append(option)
    })

    return select
}

async function finalizarPedido() {
    const user = window.getUser()
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    if (!user) {
        alert("Você precisa estar logado")
        window.location.href = "./login.html"
        return
    }

    if (carrinho.length === 0) {
        alert("Carrinho vazio")
        return
    }

    const items = carrinho.map((item) => {
        return {
            product_fk: item.product_fk,
            quantidade: item.quantidade
        }
    })

    try {
        await window.apiRequest("/orders", {
            method: "POST",
            body: JSON.stringify({
                user_fk: user.user_id,
                items
            })
        })

        localStorage.removeItem("carrinho")

        await loadProducts()
        renderProducts()
        renderCarrinho()

        alert("Pedido finalizado com sucesso!")
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

function createButtonIcon() {
    const button = document.createElement("button")

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

renderCarrinho()