import {createFormCine} from "../scripts/formToggle.js";

let movies = JSON.parse(localStorage.getItem("Movies"));
let tickets = JSON.parse(localStorage.getItem("Tickets"));


if(!movies || !tickets){
movies = [
    {name: "Invocação do Mal", duration: "1h52min", category: "kids"},
    {name: "Gente Grande", duration: "1h42min", category: "kids"}
];

tickets = [
    {name: "Ingresso Inteiro", type: "Ingresso", price: 35.00},
    {name: "Ingresso Meia", type: "Ingresso", price: 17.50},
    {name: "Refrigerante 500ml", type: "Bebida", price: 10.00},
    {name: "Pipoca Grande", type: "Alimento", price: 25.00},
    {name: "Pipoca Média", type: "Alimento", price: 20.00},
    {name: "Pipoca Pequena", type: "Alimento", price: 15.00}
];
 //preset caso null

localStorage.setItem("Movies", JSON.stringify(movies));
localStorage.setItem("Tickets", JSON.stringify(tickets));
}

const linkMovie = document.querySelector("#movies");

const linkTickets = document.querySelector("#tickets");

function route() {
    const hash = window.location.hash;

    if (hash == "#tickets") {
        renderPageTickets();
    } else {
        renderPageMovie();
        window.location.hash = "#movies";
    }
}

window.addEventListener("DOMContentLoaded", route);

window.addEventListener("hashchange", route);

linkTickets.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.hash = "#tickets";
});

linkMovie.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.hash = "#movies";
});

function renderPageTickets() {
    const main = document.querySelector("#main-content");

    main.replaceChildren();

    main.append(sectionTicket());
}

function renderPageMovie() {
    const main = document.querySelector("#main-content");

    main.replaceChildren();

    main.append(sectionMovie());
}

function sectionTicket() {
    const section = document.createElement("section");
    section.id = "section-tickets";

    const title = divTitleTicket();

    const content = divTickets();

    section.append(title, content);

    return section;
}

function sectionMovie() {
    const section = document.createElement("section");
    section.id = "section-filmes";

    const div = createDiv();
    div.id = "container";

    const title = divTitleMovie();

    const content = divMovies();

    section.append(title, div, content);

    return section;
}

function divTitleTicket() {
    const div = createDiv();
    div.classList.add("title-section");

    const h2 = createH2("Pipocas e Ingressos");

    div.appendChild(h2);

    return div;
}

function divTitleMovie() {
    const div = createDiv();
    div.classList.add("title-section");

    const h2 = createH2("Em Cartaz");

    const button = createButton("+ Novo Filme");
    button.id = "new-movie";
    button.addEventListener("click", renderFormCine);

    div.append(h2, button);

    return div;
}

function renderFormCine() {
    const divContainer = document.querySelector("#container");

    divContainer.replaceChildren();

    divContainer.append(createFormCine());

    submitFormMovies();
}

function submitFormMovies() {
    const formCine = document.querySelector("#form-cine");

    formCine.addEventListener("submit", (event) => {
        event.preventDefault();

        const dados = getMovies(formCine);

        const name = dados.name;
        const duration = dados.duration;
        const category = dados.category;

        if (!name || !duration || !category) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const movie = {
            name,
            duration,
            category
        };

        movies.push(movie);
        localStorage.setItem("Movies", JSON.stringify(movies));

        renderMovies();

        formCine.reset();

        document.querySelector("input[name= 'name']").focus();
    });
}

function divTickets() {
    const divGrid = createDiv();
    divGrid.classList.add("grid-tickets");

    tickets.forEach((ticket) => {
        const divTicket = createDiv();
        divTicket.classList.add("tickets");

        const divInfo = createDiv();
        divInfo.classList.add("info");
        const h3 = createH3(ticket.name);
        const p = createP(ticket.type);
        const span = createSpan(ticket.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }));
        divInfo.append(h3, p, span);

        const divButton = createDiv();
        divButton.classList.add("add-button");
        const button = createButton("COMPRAR");
        divButton.append(button);

        divTicket.append(divInfo, divButton);

        divGrid.append(divTicket);
    });

    return divGrid;
}

function divMovies() {
    const divGrid = createDiv();
    divGrid.classList.add("grid-filmes");

    movies.forEach((movie, index) => {
        const divFilme = createDiv();
        divFilme.classList.add("filmes");

        const divInfoBanner = createDiv();
        divInfoBanner.classList.add("banner-info");

        const divBanner = createDiv();
        divBanner.id = "banner";
        divBanner.style.backgroundImage = "url(../assets/images/" + movie.category + ".jpg)";
        const i = createI();
        i.className = "ti ti-trash";
        i.addEventListener("click", () => {
            movies.splice(index, 1);
            localStorage.setItem("Movies", JSON.stringify(movies));
            renderMovies();
        });
        divBanner.append(i);

        const divInfo = createDiv();
        divInfo.classList.add("info");
        const h3 = createH3(movie.name);
        const span = createSpan(movie.duration);
        const divSessions = createDiv();
        divSessions.classList.add("session");
        const p1 = createP("14:00");
        const p2 = createP("18:30");
        const p3 = createP("20:00");
        divSessions.append(p1, p2, p3);
        divInfo.append(h3, span, divSessions);

        divInfoBanner.append(divBanner, divInfo);

        divFilme.append(divInfoBanner);

        divGrid.append(divFilme);
    });

    return divGrid;
}

function renderMovies() {
    const divGrid = document.querySelector(".grid-filmes");

    divGrid.replaceChildren();

    movies.forEach((movie, index) => {
        const filme = newMovie(movie, index);

        divGrid.appendChild(filme);
    });
}

function newMovie(movie, index) {
    const divFilme = createDiv();
    divFilme.classList.add("filmes");

    const divInfoBanner = createDiv();
    divInfoBanner.classList.add("banner-info");

    const divBanner = createDiv();
    divBanner.id = "banner";
    divBanner.style.backgroundImage = "url(../assets/images/" + movie.category + ".jpg)";
    const i = createI();
    i.className = "ti ti-trash";
    i.addEventListener("click", () => {
        movies.splice(index, 1);
        localStorage.setItem("Movies", JSON.stringify(movies));
        renderMovies();
    });
    divBanner.append(i);

    const divInfo = createDiv();
    divInfo.classList.add("info");
    const h3 = createH3(movie.name);
    const span = createSpan(movie.duration);
    const divSessions = createDiv();
    divSessions.classList.add("session");
    const p1 = createP("14:00");
    const p2 = createP("18:30");
    const p3 = createP("20:00");
    divSessions.append(p1, p2, p3);
    divInfo.append(h3, span, divSessions);

    divInfoBanner.append(divBanner, divInfo);

    divFilme.append(divInfoBanner);

    return divFilme;
}

function getMovies(form) {
    const dados = new FormData(form);

    const name = dados.get("name");
    const duration = dados.get("duration");
    const category = dados.get("category");

    return {name, duration, category};
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