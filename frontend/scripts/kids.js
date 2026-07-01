import {createFormKids} from "../scripts/formToggle.js";

function isGerenteAtual() {
    return window.isGerente && window.isGerente();
}

const toys = [
    {name: "Ingressos Área Kids", price: 45.00, age: "3-12 anos"},
    {name: "Pula-pula", price: 15.00, age: "4-10 anos"},
    {name: "Piscina de Bolinhas", price: 20.00, age: "2-8 anos"}
];

window.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#new-item");

    if (button) {
        if (!isGerenteAtual()) {
            button.style.display = "none";
        } else {
            button.addEventListener("click", renderFormKids);
        }
    }

    divToys();
});

function divToys() {
    const divGrid = document.querySelector(".grid-kids");

    divGrid.replaceChildren();

    toys.forEach((toy, index) => {
        const divToy = createDiv();
        divToy.classList.add("area");

        const divInfoToy = createDiv();
        divInfoToy.classList.add("kids");

        const h3 = createH3(toy.name);

        const p = createP(toy.age);

        const span = createSpan(toy.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }));

        const button = createButton("COMPRAR");

        divInfoToy.append(h3, p, span, button);

        divToy.append(divInfoToy);

        if (isGerenteAtual()) {
            const divIcon = createDiv();
            divIcon.classList.add("icon-remove");

            const i = createI();
            i.className = "ti ti-trash";
            i.addEventListener("click", () => {
                toys.splice(index, 1);
                renderToy();
            });

            divIcon.append(i);
            divToy.append(divIcon);
        }

        divGrid.append(divToy);

    });

    return divGrid;
}

function renderFormKids() {
    const divContainer = document.querySelector("#container");

    divContainer.replaceChildren();

    divContainer.append(createFormKids());

    submitFormKids();
}

function submitFormKids() {
    const formKids = document.querySelector("#form-kids");

    formKids.addEventListener("submit", (event) => {
        event.preventDefault();

        const dados = getToys(formKids);

        const name = dados.name;
        const price = dados.price;
        const age = dados.age;

        if (!name || !price || !age) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const toy = {
            name,
            price,
            age
        };

        toys.push(toy);

        renderToy();

        formKids.reset();

        document.querySelector("input[name= 'name']").focus();
    });
}

function getToys(form) {
    const dados = new FormData(form);

    const name = dados.get("name");
    const price = parseFloat(dados.get("price"));
    const age = dados.get("category-age");

    return {name, price, age};
}

function renderToy() {
    const divGrid = document.querySelector(".grid-kids");

    divGrid.replaceChildren();

    toys.forEach((toy, index) => {
        const divToy = newToy(toy, index);

        divGrid.appendChild(divToy);
    });
}

function newToy(toy, index) {
    const divToy = createDiv();
    divToy.classList.add("area");

    const divInfoToy = createDiv();
    divInfoToy.classList.add("kids");

    const h3 = createH3(toy.name);

    const p = createP(toy.age);

    const span = createSpan(toy.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));

    const button = createButton("COMPRAR");

    divInfoToy.append(h3, p, span, button);

    divToy.append(divInfoToy);

    if (isGerenteAtual()) {
        const divIcon = createDiv();
        divIcon.classList.add("icon-remove");

        const i = createI();
        i.className = "ti ti-trash";
        i.addEventListener("click", () => {
            toys.splice(index, 1);
            renderToy();
        });

        divIcon.append(i);
        divToy.append(divIcon);
    }

    return divToy;
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