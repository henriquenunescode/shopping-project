const buttonToggle = document.querySelector("#new-item");


buttonToggle.addEventListener("click", () => {
    const divContainer = document.querySelector("#container");

    divContainer.replaceChildren();

    createForm();
});

function createForm() {
    const divContainer = document.querySelector("#container");

    divContainer.classList.add("container");

    const divContainerForm = document.createElement("div");
    divContainerForm.classList.add("container-form");

    const h3 = document.createElement("h3");
    h3.textContent = "Adicionar Produto";

    const form = document.createElement("form");

    const divName = document.createElement("div");

    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.name = "name";
    inputName.placeholder = "Nome do produto";
    divName.append(inputName);

    const divReference = document.createElement("div");

    const inputReference = document.createElement("input");
    inputReference.type = "text";
    inputReference.name = "reference";
    inputReference.placeholder = "Código";
    divReference.append(inputReference);

    const divPrice = document.createElement("div");

    const inputPrice = document.createElement("input");
    inputPrice.type = "number";
    inputPrice.name = "price";
    inputPrice.placeholder = "Preço";
    divPrice.append(inputPrice);

    const divStock = document.createElement("div");

    const inputStock = document.createElement("input");
    inputStock.type = "number";
    inputStock.name = "stock";
    inputStock.placeholder = "Estoque";
    divStock.append(inputStock);

    const divButton = document.createElement("div");

    const button = document.createElement("button");
    button.textContent = "Cadastrar";
    button.type = "submit";
    divButton.append(button);

    form.append(divName, divReference, divPrice, divStock, divButton);

    divContainerForm.append(h3, form);

    divContainer.append(divContainerForm);
}