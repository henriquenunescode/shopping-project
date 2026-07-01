import {createFormProducts, createFormFuncionario} from "./formToggle.js";


let storeID = ""
let productsID = ""
let funcionariosID = ""

let storeData = JSON.parse(localStorage.getItem(storeID))
let products = JSON.parse(localStorage.getItem(productsID))
let funcionarios = JSON.parse(localStorage.getItem(funcionariosID))

if(!storeData || !products || !funcionarios){
products = [
    {name: "Relógio", price: 199.90, reference: "abc123", stock: 50, type: "kids"},
    {name: "Moletom Preto", price: 299.90, reference: "def456", stock: 100, type: "kids"},
    {name: "Tênis Nike", price: 149.90, reference: "ghi789", stock: 150, type: "kids"}
];
funcionarios = [
    {name: "João da Silva", cargo: "Gerente", email: "joao@gmail.com"},
    {name: "Maria Meirelles", cargo: "Vendedor(a)", email: "maria@gmail.com"}
];


localStorage.setItem(productsID, JSON.stringify(products));
localStorage.setItem(funcionariosID, JSON.stringify(funcionarios));
}
let backbut = document.querySelector("#voltar")

backbut.addEventListener("click", (e)=>{
e.preventDefault();
localStorage.removeItem("storeID")
window.location.href = "dashboard.html";
})


const linkProducts = document.querySelector("#products");

const linkFuncionarios = document.querySelector("#funcionarios");

function route() {
    const hash = window.location.hash;

    if (hash == "#funcionarios") {
        renderPageFuncionarios();
    } else {
        renderPageProducts();

        window.location.hash = "#products";
    }
}

window.addEventListener("DOMContentLoaded", route);

window.addEventListener("hashchange", route);

linkFuncionarios.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.hash = "#funcionarios";
})

linkProducts.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.hash = "#products";
});

function renderPageFuncionarios() {
    const main = document.querySelector("#main-content");

    main.replaceChildren();

    main.append(sectionFuncionario());
}

function renderPageProducts() {
    const main = document.querySelector("#main-content");

    main.replaceChildren();

    main.append(sectionProduct());
}

function sectionFuncionario() {
    const section = document.createElement("section");
    section.id = "section-funcionarios";

    const div = createDiv();
    div.id = "container";

    const title = divTitleFuncionario();

    const content = divFuncionarios();

    section.append(title, div, content);

    return section;
}

function sectionProduct() {
    const section = document.createElement("section");
    section.id = "view-products";

    const div = createDiv();
    div.id = "container";

    const title = divTitleProduct();

    const content = divProducts();

    section.append(title, div, content);

    return section;
}

function divTitleFuncionario() {
    const div = createDiv();
    div.classList.add("title-section");

    const h2 = createH2("Funcionários");

    const button = createButton("+ Novo Funcionário");
    button.id = "new-funcionario";
    button.addEventListener("click", renderFormFuncionario);

    div.append(h2, button);

    return div;
}

function divTitleProduct() {
    const div = createDiv();
    div.classList.add("title-section");

    const h2 = createH2("Produtos");

    const button = createButton("+ Novo Produto");
    button.id = "new-product";
    button.addEventListener("click", renderFormProduct);

    div.append(h2, button);

    return div;
}

function renderFormFuncionario() {
    const divContainer = document.querySelector("#container");

    divContainer.replaceChildren();

    divContainer.append(createFormFuncionario());

    submitFormFuncionario();
}

function renderFormProduct() {
    const divContainer = document.querySelector("#container");

    divContainer.replaceChildren();

    divContainer.append(createFormProducts());

    submitFormProduct();
}

function submitFormFuncionario() {
    const formFuncionario = document.querySelector("#form-funcionario");

    formFuncionario.addEventListener("submit", (event) => {
        event.preventDefault();

        const dados = getFuncionario(formFuncionario);

        const name = dados.name;
        const text = dados.cargo;
        const cargo = text[0].toUpperCase() + text.slice(1);
        const email = dados.email;

        if (!name || !text || !email) {
            alert("Preencha os campos corretamente!");
            return;
        }

        const funcionario = {
            name,
            cargo,
            email
        };

        funcionarios.push(funcionario);
        localStorage.setItem(funcionariosID, JSON.stringfy(funcionarios));

        renderFuncionarios();

        formFuncionario.reset();

        document.querySelector("input[name = 'name']").focus();
    });
}

function submitFormProduct() {
    const formProduct = document.querySelector("#form-product");

    formProduct.addEventListener("submit", (event) => {
        event.preventDefault();

        const dados = getProduct(formProduct);

        const name = dados.name;
        const price = dados.price;
        const reference = dados.reference;
        const stock = dados.stock;
        const type = dados.type;

        if (!name || !price || !reference || !stock || !type) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const product = {
            name,
            price,
            reference,
            stock,
            type
        };

        products.push(product);
        localStorage.setItem(productsID, JSON.stringify(products));
        
        renderProducts();

        formProduct.reset();

        document.querySelector("input[name = 'name']").focus();
    });
}

function divFuncionarios() {
    const divGrid = createDiv();
    divGrid.classList.add("grid-funcionarios");

    funcionarios.forEach((funcionario, index) => {
        const divFuncionario = createDiv();
        divFuncionario.classList.add("funcionario");

        const divInfoFuncionario = createDiv();
        divInfoFuncionario.classList.add("info-funcionario");
        const h3 = createH3(funcionario.name);
        const span = createSpan(funcionario.cargo);
        const p = createP(funcionario.email);
        divInfoFuncionario.append(h3, span, p);

        const divRemove = createDiv();
        divRemove.classList.add("icon-remove");
        const i = createI();
        i.className = "ti ti-trash";
        divRemove.append(i);
        divRemove.addEventListener("click", () => {
            funcionarios.splice(index, 1);
            localStorage.setItem(funcionariosID, JSON.stringfy(funcionarios));
            renderFuncionarios();
        });

        divFuncionario.append(divInfoFuncionario, divRemove);

        divGrid.append(divFuncionario);
    });

    return divGrid;
}

function divProducts() {
    const divGrid = createDiv();
    divGrid.classList.add("grid-products");

    products.forEach((product, index) => {
        const divProduct = createDiv();
        divProduct.classList.add("product");

        const img = document.createElement("img");
        img.src = "../assets/images/" + product.type + ".jpg";
        img.alt = product.type;

        const divInfoProduct = createDiv();
        divInfoProduct.classList.add("info-product");
        const h3 = createH3(product.name);
        const price = createP(product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }));
        price.classList.add("price");
        const stock = createP("Estoque: " + product.stock);
        stock.classList.add("stock");
        divInfoProduct.append(h3, price, stock);

        const select = createSelect("quantity", "quantity", ["Selecionar a quantidade", "1", "2", "3", "4", "5"]);

        const divButtons = createDiv();
        divButtons.classList.add("buttons");
        const buttonAdd = createButton("Adicionar ao carrinho");
        buttonAdd.classList.add("add");
        const buttonRemove = createButtonIcon();
        buttonRemove.classList.add("icon-remove");
        const i = createI();
        i.className = "ti ti-trash";
        buttonRemove.append(i);
        buttonRemove.addEventListener("click", () => {
            products.splice(index, 1);
            localStorage.setItem(productsID, JSON.stringify(products));
            renderProducts();
        });
        divButtons.append(buttonAdd, buttonRemove);

        divProduct.append(img, divInfoProduct, select, divButtons);

        divGrid.append(divProduct);
    });

    return divGrid;
}

function getFuncionario(form) {
    const dados = new FormData(form);

    const name = dados.get("name");
    const cargo = dados.get("cargo");
    const email = dados.get("email");

    return {name, cargo, email};
}

function getProduct(form) {
    const dados = new FormData(form);

    const name = dados.get("name");
    const price = parseFloat(dados.get("price"));
    const reference = dados.get("reference");
    const stock = parseInt(dados.get("stock"));
    const type = dados.get("type");

    return {name, price, reference, stock, type};
}

function renderFuncionarios() {
    const divGrid = document.querySelector(".grid-funcionarios");

    divGrid.replaceChildren();

    funcionarios.forEach((funcionario, index) => {
        const f = newFuncionario(funcionario, index);

        divGrid.appendChild(f);
    });
}

function renderProducts() {
    const divGrid = document.querySelector(".grid-products");

    divGrid.replaceChildren();

    products.forEach((product, index) => {
        const produto = newProduct(product, index);

        divGrid.appendChild(produto);
    });
}

function newFuncionario(funcionario, index) {
    const divFuncionario = createDiv();
    divFuncionario.classList.add("funcionario");

    const divInfoFuncionario = createDiv();
    divInfoFuncionario.classList.add("info-funcionario");
    const h3 = createH3(funcionario.name);
    const span = createSpan(funcionario.cargo);
    const p = createP(funcionario.email);
    divInfoFuncionario.append(h3, span, p);

    const divRemove = createDiv();
    divRemove.classList.add("icon-remove");
    const i = createI();
    i.className = "ti ti-trash";
    divRemove.append(i);
    divRemove.addEventListener("click", () => {
        funcionarios.splice(index, 1);
        localStorage.setItem(funcionariosID, JSON.stringfy(funcionarios));

        renderFuncionarios();
    });

    divFuncionario.append(divInfoFuncionario, divRemove);

    return divFuncionario;
}

function newProduct(product, index) {
    const divProduct = createDiv();
    divProduct.classList.add("product");

    const img = document.createElement("img");
    img.src = "../assets/images/" + product.type + ".jpg";
    img.alt = product.type;

    const divInfoProduct = createDiv();
    divInfoProduct.classList.add("info-product");
    const h3 = createH3(product.name);
    const price = createP(product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));
    price.classList.add("price");
    const stock = createP("Estoque: " + product.stock);
    stock.classList.add("stock");
    divInfoProduct.append(h3, price, stock);

    const select = createSelect("quantity", "quantity", ["Selecionar a quantidade", "1", "2", "3", "4", "5"]);

    const divButtons = createDiv();
    divButtons.classList.add("buttons");
    const buttonAdd = createButton("Adicionar ao carrinho");
    buttonAdd.classList.add("add");
    const buttonRemove = createButtonIcon();
    buttonRemove.classList.add("icon-remove");
    const i = createI();
    i.className = "ti ti-trash";
    buttonRemove.append(i);
    buttonRemove.addEventListener("click", () => {
        products.splice(index, 1);
        localStorage.setItem(productsID, JSON.stringify(products));
        renderProducts();
    });
    divButtons.append(buttonAdd, buttonRemove);

    divProduct.append(img, divInfoProduct, select, divButtons);

    return divProduct;
}

function createSelect(name, id, options) {
    const select = document.createElement("select");
    select.name = name;
    select.id = id;

    options.forEach((optionText) => {
        const option = document.createElement("option");
        option.value = optionText.toLowerCase();
        option.textContent = optionText;

        select.append(option);
    });

    return select;
}

function createDiv() {
    const div = document.createElement("div");

    return div;
}

function createH2(text) {
    const h2 = document.createElement("h2");

    h2.textContent = text;

    return h2;
}

function createButton(text) {
    const button = document.createElement("button");

    button.textContent = text;

    return button;
}

function createButtonIcon() {
    const button = document.createElement("button");

    return button;
}

function createH3(text) {
    const h3 = document.createElement("h3");

    h3.textContent = text;

    return h3;
}

function createSpan(text) {
    const span = document.createElement("span");

    span.textContent = text;

    return span;
}

function createP(text) {
    const p = document.createElement("p");

    p.textContent = text;

    return p;
}

function createI() {
    const i = document.createElement("i");

    return i;
}