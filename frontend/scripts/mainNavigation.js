import { createFormRestaurant } from "../scripts/formToggle.js";

const dishs = [
    {name: "Risoto de Camarão", category: "Pratos Principais", descrition: "Arroz arbóreo com camarão", price: 68.00},
    {name: "Peixe Assado", category: "Pratos Principais", descrition: "Assado de peixe com legumes chamuscados", price: 55.00},
    {name: "Tiramisù", category: "Sobremesas", descrition: "Sobremesa italiana clássica", price: 28.00}
];

const linkMenu = document.querySelector("#menu");

linkMenu.addEventListener("click", (event) => {
    event.preventDefault();

    const main = document.querySelector("#main-content");

    main.replaceChildren();

    main.append(sectionMenu());
});

function sectionMenu() {
    const section = document.createElement("section");
    section.id = "section-menu";

    const div = createDiv();
    div.id = "container";

    const title = divTitle();

    const content = divDishs();

    section.append(title, div, content);

    return section;
}

function divTitle() {
    const div = createDiv();
    div.classList.add("title-section");

    const h2 = createH2("Menu");

    const button = createButton("+ Novo Prato");
    button.id = "new-dish";
    button.addEventListener("click", () => {
        const divContainer = document.querySelector("#container");

        divContainer.replaceChildren();

        divContainer.append(createFormRestaurant());
    });

    div.append(h2, button);

    return div;
}

function divDishs() {
    const divGrid = createDiv();
    divGrid.classList.add("grid-pratos");

    dishs.forEach((prato) => {
    
        const divPratos = createDiv();
        divPratos.classList.add("pratos");

        const divContainer = createDiv();
        divContainer.classList.add("info-prato");

        const divTitle = createDiv();
        divTitle.classList.add("name-category");

        const h3 = createH3(prato.name);
        const span = createSpan(prato.category.toUpperCase());
        divTitle.append(h3, span);

        const pDescrition = createP(prato.descrition);
        pDescrition.classList.add("descrition");

        const pPrice = createP(prato.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }));
        pPrice.classList.add("price");

        divContainer.append(divTitle, pDescrition, pPrice);

        const divIcon = createDiv();
        divIcon.classList.add("icon-remove");

        const icon = createI();
        icon.className = "ti ti-trash";
        divIcon.append(icon);
    
        divPratos.append(divContainer, divIcon);
    
        divGrid.append(divPratos);
    });

    return divGrid;

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