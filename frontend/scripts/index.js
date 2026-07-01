let stores = JSON.parse(localStorage.getItem("Stores"));

if(!stores){
 stores = [
    {id:1, name:"Boutique Élite", type:"MODA", imgID:"img-boutique"},
    {id:2, name:"Maison Decor", type:"CASA", imgID:"img-casa"},
    {id:3, name:"Studio Wear", type:"MODA", imgID:"img-moda"}
 ]

 localStorage.setItem("Stores", JSON.stringify(stores))
}

let storesFather = document.querySelector(".lojas-cards")

stores.forEach(store => {
    let name = store.name;
    let type= store.type;
    let imgID = store.imgID

let div = document.createElement("div");
let spanName = document.createElement("span");
let h3 = document.createElement("h3")

div.id = imgID;
spanName.textContent = type;
h3.textContent = name;

div.addEventListener("click", ()=>{
    window.location.href = "pages/login.html";
})

div.append(spanName, h3);

storesFather.append(div);

});

let rest = document.querySelector("#img-gastronomia");

rest.addEventListener("click", ()=>{
    window.location.href = "pages/login.html";
})

let cinema = document.querySelector("#img-lazer");

cinema.addEventListener("click", ()=>{
    window.location.href = "pages/login.html";
})