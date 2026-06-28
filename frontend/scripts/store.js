import {createFormProducts, createFormFuncionario} from "./formToggle.js";

const products = [
    {name: "Relógio", price: 199.90, reference: "abc123", stock: 50, type: "kids"},
    {name: "Moletom Preto", price: 299.90, reference: "def456", stock: 100, type: "kids"},
    {name: "Tênis Nike", price: 149.90, reference: "ghi789", stock: 150, type: "kids"}
];

const cart = [];

const funcionarios = [
    {name: "João da Silva", cargo: "Gerente", email: "joao@gmail.com"},
    {name: "Maria Meirelles", cargo: "Vendedor(a)", email: "maria@gmail.com"}
];

const linkProducts = document.querySelector("#products");

const linkFuncionarios = document.querySelector("#funcionarios");

const openCart = document.querySelector("#open-cart");

const asideCart = document.querySelector(".cart-products");

const closeCart = document.querySelector("#close-cart");

const finalizarCompra = document.querySelector(".comprar");

finalizarCompra.addEventListener("click", finalizeCompra);

openCart.addEventListener("click", () => {
    asideCart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    asideCart.classList.remove("active");
});

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
        
        const exists = products.some((product) => {
            return product.reference == reference;
        });
        
        if (exists) {
            alert("Já existe um produto com este código!");
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

    products.forEach((product) => {
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
        if (product.stock < 50) {
            stock.classList.add("baixo");
        } else if (product.stock < 100) {
            stock.classList.add("medium");
        } else {
            stock.classList.add("alto");
        }

        divInfoProduct.append(h3, price, stock);

        const select = createSelect("quantity", "quantity", ["Selecionar a quantidade", "1", "2", "3", "4", "5"]);

        const divButtons = createDiv();
        divButtons.classList.add("buttons");
        const buttonAdd = createButton("Adicionar ao carrinho");
        buttonAdd.classList.add("add");
        buttonAdd.addEventListener("click", () => {
            const quantity = Number(select.value);

            if (isNaN(quantity)) {
                alert("Selecione uma quantidade!");
                return;
            }

            const exists = cart.some((item) => {
                return item.reference == product.reference;
            });

            if (exists) {
                alert("Este produto já foi adicionado ao carrinho!");
                return;
            }
            
            const produto = {
                name: product.name,
                price: product.price,
                type: product.type,
                reference: product.reference,
                quantity
            };

            cart.push(produto);

            renderCart();
        });
        const buttonRemove = createButtonIcon();
        buttonRemove.classList.add("icon-remove");
        const i = createI();
        i.className = "ti ti-trash";
        buttonRemove.append(i);
        buttonRemove.addEventListener("click", () => {
            removeProduct(product.reference);
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

        renderFuncionarios();
    });

    divFuncionario.append(divInfoFuncionario, divRemove);

    return divFuncionario;
}

function newProduct(product) {
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
    if (product.stock < 50) {
        stock.classList.add("baixo");
    } else if (product.stock < 100) {
        stock.classList.add("medium");
    } else {
        stock.classList.add("alto");
    }

    divInfoProduct.append(h3, price, stock);

    const select = createSelect("quantity", "quantity", ["Selecionar a quantidade", "1", "2", "3", "4", "5"]);

    const divButtons = createDiv();
    divButtons.classList.add("buttons");
    const buttonAdd = createButton("Adicionar ao carrinho");
    buttonAdd.classList.add("add");
    buttonAdd.addEventListener("click", () => {
        const quantity = Number(select.value);

        if (isNaN(quantity)) {
            alert("Selecione uma quantidade!");
            return;
        }

        const exists = cart.some((item) => {
            return item.reference == product.reference;
        });

        if (exists) {
            alert("Este produto já foi adicionado ao carrinho!");
            return;
        }
        
        const produto = {
            name: product.name,
            price: product.price,
            type: product.type,
            reference: product.reference,
            quantity
        };

        cart.push(produto);

        renderCart();
    });
    const buttonRemove = createButtonIcon();
    buttonRemove.classList.add("icon-remove");
    const i = createI();
    i.className = "ti ti-trash";
    buttonRemove.append(i);
    buttonRemove.addEventListener("click", () => {
        removeProduct(product.reference);
    });
    divButtons.append(buttonAdd, buttonRemove);

    divProduct.append(img, divInfoProduct, select, divButtons);

    return divProduct;
}

function removeProduct(reference) {
    const index = products.findIndex((item) => {
        return item.reference == reference;
    });

    if (index != -1) {
        products.splice(index, 1);
        renderProducts();
    } else {
        alert("Produto não encontrado!");
    }
}

function updateTotal() {
    const totalCart = document.querySelector(".cart-total");

    const total = cart.reduce((acc, item) => {
        return acc += (item.price * item.quantity);
    }, 0);

    totalCart.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function updateCart() {
    const update = document.querySelector("#update-cart");

    update.textContent = cart.length;
}

function renderCart() {
    const listCart = document.querySelector(".list-cart");

    listCart.replaceChildren();

    cart.forEach((produto) => {
        const card = productCart(produto, produto.quantity);
        listCart.appendChild(card);
    });

    updateTotal();
    updateCart();
}

function productCart(product, quantity) {
    const divProduct = createDiv();
    divProduct.classList.add("product");

    const divImage = createDiv();
    divImage.classList.add("image");
    const divRemove = createDiv();
    divRemove.classList.add("remove");
    const iconRemove = createI();
    iconRemove.className = "ti ti-trash";
    divRemove.append(iconRemove);
    divImage.append(divRemove);
    divRemove.addEventListener("click", () => {
        removeFromCart(product.reference);
    });

    const divName = createDiv();
    divName.classList.add("name");
    const h3 = createH3(product.name);
    divName.append(h3);

    const divPrice = createDiv();
    divPrice.classList.add("price");
    const spanPrice = createSpan(product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));
    divPrice.append(spanPrice);

    const divQuantity = createDiv();
    divQuantity.classList.add("quantity");
    const divMinusPlus = createDiv();
    divMinusPlus.classList.add("minus-maximus");
    const iMinus = createI();
    iMinus.addEventListener("click", () => {
        const item = cart.find((produto) => {
            return produto.reference == product.reference;
        });

        if (!item) {
            return;
        }

        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeFromCart(product.reference);
        }

        renderCart();
    });

    iMinus.className = "ti ti-minus";
    const spanQuantity = createSpan(quantity);
    const iPlus = createI();
    iPlus.className = "ti ti-plus";
    iPlus.addEventListener("click", () => {
        const item = cart.find((produto) => {
            return produto.reference == product.reference;
        });

        const stock = products.find((produto) => {
            return produto.reference == product.reference;
        });

        if (!item || !stock) {
            return;
        }

        if (item.quantity < stock.stock) {
            item.quantity++;

            renderCart();
        } else {
            alert("Estoque insuficiente!");
        }
    })

    divMinusPlus.append(iMinus, spanQuantity, iPlus);
    divQuantity.append(divMinusPlus);

    divProduct.append(divImage, divName, divPrice, divQuantity);

    return divProduct;

}

function removeFromCart(reference) {
    const index = cart.findIndex((item) => {
        return item.reference == reference;
    });

    if (index != -1) {
        cart.splice(index, 1);
        renderCart();
    }
}

function finalizeCompra() {
    if (cart.length == 0) {
        alert("O carrinho está vazio!");
        return;
    }

    cart.forEach((item) => {
        const index = products.findIndex((produto) => {
            return produto.reference == item.reference;
        });

       if (index != -1) {
        products[index].stock -= item.quantity;

            if (products[index].stock <= 0) {
                alert("Produto removido por falta de estoque: " + products[index].name);

                products.splice(index, 1);

            }
       }
    });

    cart.length = 0;

    renderProducts();
    renderCart();

    alert("Compra finalizada com sucesso!");
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