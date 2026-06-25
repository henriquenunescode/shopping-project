export function createFormMenu() {
    const divContainer = document.querySelector("#container");

    divContainer.classList.add("container");

    const containerForm = divContainerForm();

    const h3 = createH3("Adicionar Prato");

    const form = document.createElement("form");
    form.id = "form-menu";

    const fieldName = createInput("text", "name", "Nome do prato");

    const fieldPrice = createInput("number", "price", "Preço");

    const fieldDescrition = createInput("text", "descrition", "Descrição");

    const fieldSelect = createSelect("category", "category", ["Selecionar a categoria", "Pratos Principais", "Sobremesas"]);

    const button = createButton("ADICIONAR");

    form.append(fieldName, fieldPrice, fieldDescrition, fieldSelect, button);

    containerForm.append(h3, form);

    return containerForm;
}

export function createFormChefs() {
    const divContainer = document.querySelector("#container");

    divContainer.classList.add("container");

    const containerForm = divContainerForm();

    const h3 = createH3("Adicionar Chef");

    const form = document.createElement("form");
    form.id = "form-chefs";

    const fieldName = createInput("text", "name", "Nome do chef");

    const fieldEspecialidade = createInput("text", "especialidade", "Especialidade");

    const button = createButton("ADICIONAR");

    form.append(fieldName, fieldEspecialidade, button);

    containerForm.append(h3, form);

    return containerForm;
}

export function createFormKids() {
    const divContainer = document.querySelector("#container");

    divContainer.classList.add("container");

    const containerForm = divContainerForm();

    const h3 = createH3("Adicionar Item");

    const form = document.createElement("form");
    form.id = "form-kids";

    const fieldName = createInput("text", "name", "Nome do item");

    const fieldPrice = createInput("number", "price", "Preço");

    const fieldSelect = createSelect("category-age", "category-age", ["Selecionar a categoria", "3-12 anos", "4-10 anos", "2-8 anos"]);

    const button = createButton("ADICIONAR");

    form.append(fieldName, fieldPrice, fieldSelect, button);

    containerForm.append(h3, form);

    return containerForm;
}

export function createFormCine() {
    const divContainer = document.querySelector("#container");
    divContainer.classList.add("container");

    const containerForm = divContainerForm();

    const h3 = createH3("Adicionar Filme");

    const form = document.createElement("form");
    form.id = "form-cine";

    const fieldName = createInput("text", "name", "Nome do filme");

    const fieldDuration = createInput("text", "duration", "Duração (ex: 2h15min)");

    const fieldSelect = createSelect("category", "category", ["Selecionar a categoria", "Terror", "Romance", "Comédia", "Thriller/Suspense", "Ação", "Aventura", "kids"]);

    const button = createButton("ADICIONAR");

    form.append(fieldName, fieldDuration, fieldSelect, button);

    containerForm.append(h3, form);

    return containerForm;
}

export function createFormProducts() {
    const divContainer = document.querySelector("#container");
    
    divContainer.classList.add("container");

    const containerForm = divContainerForm();

    const h3 = createH3("Adicionar Produto");

    const form = document.createElement("form");
    form.id = "form-product";

    const fieldName = createInput("text", "name", "Nome do produto");

    const fieldPrice = createInput("number", "price", "Preço");
    
    const fieldReference = createInput("text", "reference", "Código");

    const fieldStock = createInput("number", "stock", "Estoque");

    const fieldSelect = createSelect("type", "type", ["kids"]);

    const button = createButton("ADICIONAR");

    form.append(fieldName, fieldPrice, fieldReference, fieldStock, fieldSelect, button);

    containerForm.append(h3, form);

    return containerForm;
}

export function createFormFuncionario() {
    const divContainer = document.querySelector("#container");

    divContainer.classList.add("container");

    const containerForm = divContainerForm();

    const h3 = createH3("Cadastrar Funcionário");

    const form = document.createElement("form");
    form.id = "form-funcionario";

    const fieldName = createInput("text", "name", "Nome do funcionário");

    const fieldSelect = createSelect("cargo", "cargo", ["Selecionar o cargo", "Gerente", "Vendedor(a)", "Caixa", "Estoquista"]);

    const fieldEmail = createInput("email", "email", "Email do funcionário");

    const button = createButton("CADASTRAR");

    form.append(fieldName, fieldSelect, fieldEmail, button);

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
        option.value = optionText.toLowerCase();
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