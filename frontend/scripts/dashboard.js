const clickAlimentacao = document.querySelector("#alimentacao");

let stores = JSON.parse(localStorage.getItem("Stores"));

if(!stores){
 stores = [{
    
 }]
}


clickAlimentacao.addEventListener("click", () => {
    window.location.href = "../pages/restaurante.html";
});

const clickKids = document.querySelector("#img-kids");

clickKids.addEventListener("click", () => {
    window.location.href = "../pages/kids.html";
});

const clickCine = document.querySelector("#img-lazer");

clickCine.addEventListener("click", () => {
    window.location.href = "../pages/cinema.html";
});