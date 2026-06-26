import { createFormMenu, createFormChefs } from "../scripts/formToggle.js";

let dishs =  JSON.parse(localStorage.getItem("Dishs"));
let chefs =  JSON.parse(localStorage.getItem("Chefs"));

if(!dishs || !chefs){
dishs = [
    {name: "Risoto de Camarão", category: "Pratos Principais", descrition: "Arroz arbóreo com camarão", price: 68.00},
    {name: "Peixe Assado", category: "Pratos Principais", descrition: "Assado de peixe com legumes chamuscados", price: 55.00},
    {name: "Tiramisù", category: "Sobremesas", descrition: "Sobremesa italiana clássica", price: 28.00}
];
chefs = [
    {name: "Antônio Rossi", especialidade: "Cozinha Italiana"},
    {name: "Maria Dubois", especialidade: "Cozinha Francesa"},
];//preset caso null

localStorage.setItem("Dishs", JSON.stringify(dishs));
localStorage.setItem("Chefs", JSON.stringify(chefs));
}

const linkMenu = document.querySelector("#menu");

const linkChefs = document.querySelector("#chefs");

function route() {
    const hash = window.location.hash;

    if(hash == "#chefs") {
        renderPageChefs();
    } else {
        renderPageMenu();
        window.location.hash = "#menu";
    }
}

window.addEventListener("DOMContentLoaded", route);

window.addEventListener("hashchange", route);

linkMenu.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.hash = "#menu";
});

function renderPageMenu() {
    const main = document.querySelector("#main-content");
    
    main.replaceChildren();
    
    main.append(sectionMenu());
}

linkChefs.addEventListener("click", (event) => {
    event.preventDefault();
    
    window.location.hash = "#chefs";
});

function renderPageChefs() {
    const main = document.querySelector("#main-content");
    
    main.replaceChildren();
    
    main.append(sectionChefs());
}

function sectionMenu() {
    const section = document.createElement("section");
    section.id = "section-menu";

    const div = createDiv();
    div.id = "container";

    const title = divTitleMenu();

    const content = divDishs();

    section.append(title, div, content);

    return section;
}

function sectionChefs() {
    const section = document.createElement("section");
    section.id = "section-chefs";

    const div = createDiv();
    div.id = "container";
    
    const title = divTitleChefs();

    const content = divChefs();
    
    section.append(title, div, content);
    
    return section;
}

function divTitleMenu() {
    const div = createDiv();
    div.classList.add("title-section");
    
    const h2 = createH2("Menu");
    
    const button = createButton("+ Novo Prato");
    button.id = "new-dish";
    button.addEventListener("click", renderFormMenu);
    
    div.append(h2, button);
    
    return div;
}

function renderFormMenu() {
    const divContainer = document.querySelector("#container");
    
    divContainer.replaceChildren();
    
    divContainer.append(createFormMenu());

    submitMenu();

}

function submitMenu() {
    const formMenu = document.querySelector("#form-menu");

    formMenu.addEventListener("submit", (event) => {
        event.preventDefault();

        const dados = getDishs(formMenu);

        const name = dados.name;
        const price = dados.price;
        const descrition = dados.descrition;
        const category = dados.category;

        if (!name || !price || !descrition || !category) {
            alert("Preencha os campos corretamente!");
            return;
        }

        const dish = {
            name,
            price,
            descrition,
            category
        };

        dishs.push(dish);
        localStorage.setItem("Dishs", JSON.stringify(dishs));
        

        renderDishs();

        formMenu.reset();

        document.querySelector("input[name= 'name']").focus();
    });
}

function divTitleChefs() {
    const div = createDiv();
    div.classList.add("title-section");
    
    const h2 = createH2("Chefs");
    
    const button = createButton("+ Novo Chef");
    button.id = "new-chef";
    button.addEventListener("click", renderFormChef);
    
    div.append(h2, button);
    
    return div;
}

function renderFormChef() {
    const divContainer = document.querySelector("#container");
    
    divContainer.replaceChildren();
    
    divContainer.append(createFormChefs());

    submitFormChef();

} 

function submitFormChef() {
    const formChefs = document.querySelector("#form-chefs");
    
    formChefs.addEventListener("submit", (event) => {
        event.preventDefault();
    
        const dados = getChefs(formChefs);
    
        const name = dados.name;
        const especialidade = dados.especialidade;
    
        if (!name || !especialidade) {
            alert("Preencha todos os campos corretamente!");
            return;
        }
    
        const chef = {
            name,
            especialidade
        };
    
        chefs.push(chef);
        localStorage.setItem("Chefs", JSON.stringify(chefs));
    
        renderChef();
    
        formChefs.reset();
    
        document.querySelector("input[name= 'name']").focus();
    });
}


function divDishs() {
    const divGrid = createDiv();
    divGrid.classList.add("grid-pratos");

    dishs.forEach((prato, index) => {
    
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
        icon.addEventListener("click", () => {
            dishs.splice(index, 1);
            localStorage.setItem("Dishs", JSON.stringify(dishs));
            renderDishs();
        });

        divIcon.append(icon);
    
        divPratos.append(divContainer, divIcon);
    
        divGrid.append(divPratos);
    });

    return divGrid;

}

function getDishs(form) {
    const dados = new FormData(form);

    const name = dados.get("name");
    const price = parseFloat(dados.get("price"));
    const descrition = dados.get("descrition");
    const category = dados.get("category");

    return {name, price, descrition, category};
}

function renderDishs() {
    const divGrid = document.querySelector(".grid-pratos");

    divGrid.replaceChildren();

    dishs.forEach((prato, index) => {
        const dish = newDish(prato, index);

        divGrid.appendChild(dish);
    });
}

function newDish(prato, index) {
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
    icon.addEventListener("click", () => {
        dishs.splice(index, 1);
        localStorage.setItem("Dishs", JSON.stringify(dishs));
        renderDishs();
    });

    divIcon.append(icon);
    
    divPratos.append(divContainer, divIcon);

    return divPratos;

}

function divChefs() {
    const divGrid = createDiv();
    divGrid.classList.add("grid-chefs");

    chefs.forEach((chef, index) => {
    
        const divChefs = createDiv();
        divChefs.classList.add("chefs");

        const divInfoChefs = createDiv();
        divInfoChefs.classList.add("info-chefs");

        const i = createI();
        i.className = "ti ti-chef-hat";

        const h3 = createH3(chef.name);

        const span = createSpan(chef.especialidade);
        divInfoChefs.append(i, h3, span);

        const divIcon = createDiv();
        divIcon.classList.add("icon-remove");

        const icon = createI();
        icon.className = "ti ti-trash";
        icon.addEventListener("click", () => {
            chefs.splice(index, 1);
            localStorage.setItem("Chefs", JSON.stringify(chefs));
            renderChef();
        });

        divIcon.append(icon);
    
        divChefs.append(divInfoChefs, divIcon);
    
        divGrid.append(divChefs);
    });

    return divGrid;

}

export function getChefs(form) {
    const dados = new FormData(form);

    const name = dados.get("name");
    const especialidade = dados.get("especialidade");

    return {name, especialidade};
}

export function renderChef() {
    const divGrid = document.querySelector(".grid-chefs");

    divGrid.replaceChildren();

    chefs.forEach((chef, index) => {
        const divChef = newChef(chef, index);

        divGrid.appendChild(divChef);
    });
}

export function newChef(chef, index) {
    const divChefs = createDiv();
        divChefs.classList.add("chefs");

        const divInfoChefs = createDiv();
        divInfoChefs.classList.add("info-chefs");

        const i = createI();
        i.className = "ti ti-chef-hat";

        const h3 = createH3(chef.name);

        const span = createSpan(chef.especialidade);
        divInfoChefs.append(i, h3, span);

        const divIcon = createDiv();
        divIcon.classList.add("icon-remove");

        const icon = createI();
        icon.className = "ti ti-trash";
        icon.addEventListener("click", () => {
            chefs.splice(index, 1);
            localStorage.setItem("Chefs", JSON.stringify(chefs));
            renderChef();
        });

        divIcon.append(icon);
    
        divChefs.append(divInfoChefs, divIcon);

        return divChefs;
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