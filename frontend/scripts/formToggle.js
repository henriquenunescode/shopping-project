const buttonStore = document.querySelector("#new-product");

const buttonRestaurant = document.querySelector("#new-dish");

if (buttonStore) {
    buttonStore.addEventListener("click", () => {
    const divContainer = document.querySelector("#container");

    divContainer.replaceChildren();

    divContainer.append(createFormStore());
    }); 
}

if (buttonRestaurant) {
    buttonRestaurant.addEventListener("click", () => {
    const divContainer = document.querySelector("#container");

    divContainer.replaceChildren();

    divContainer.append(createFormRestaurant());
    });
}

function createFormStore() {
    const divContainer = document.querySelector("#container");

    divContainer.classList.add("container");

    const containerForm = divContainerForm();

    const h3 = createH3("Adicionar Produto");

    const form = document.createElement("form");

    const fieldName = createInput("text", "name", "Nome do produto");

    const fieldReference = createInput("text", "reference", "Código");

    const fieldPrice = createInput("number", "price", "Preço");

    const fieldStock = createInput("number", "stock", "Estoque");

    const button = createButton("ADICIONAR");

    form.append(fieldName, fieldReference, fieldPrice, fieldStock, button);

    containerForm.append(h3, form);

    return containerForm;
}

export function createFormRestaurant() {
    const divContainer = document.querySelector("#container");

    divContainer.classList.add("container");

    const containerForm = divContainerForm();

    const h3 = createH3("Adicionar Prato");

    const form = document.createElement("form");

    const fieldName = createInput("text", "name", "Nome do prato");

    const fieldPrice = createInput("number", "price", "Preço");

    const fieldDescrition = createInput("text", "descrition", "Descrição");

    const fieldSelect = createSelect("category", "category", ["Selecionar a categoria", "Pratos Principais", "Sobremesas"]);

    const button = createButton("ADICIONAR");

    form.append(fieldName, fieldPrice, fieldDescrition, fieldSelect, button);

    containerForm.append(h3, form);

    return containerForm;
}

function createInput(type, name, placeholder) {
    const div = document.createElement("div");

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;

    div.append(input);

    return div;
}

function createH3(text) {
    const h3 = document.createElement("h3");

    h3.textContent = text;

    return h3;
}

function createSelect(name, id, options) {
    const div = document.createElement("div");

    const select = document.createElement("select");
    select.name = name;
    select.id = id;

    options.forEach((optionText) => {
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;

        select.append(option);
    });

    div.append(select);

    return div;
}

function createButton(text) {
    const button = document.createElement("button");
    
    button.type = "submit";

    button.textContent = text;

    return button;
}

function divContainerForm() {
    const div = document.createElement("div");

    div.classList.add("container-form");

    return div;
}