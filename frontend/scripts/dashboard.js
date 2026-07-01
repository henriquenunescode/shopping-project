const clickAlimentacao = document.querySelector("#alimentacao");

let stores = JSON.parse(localStorage.getItem("Stores"));


if(!stores){
 stores = [
    {id:1, name:"Boutique Élite", type:"MODA", imgID:"img-boutique"},
    {id:2, name:"Maison Decor", type:"CASA", imgID:"img-casa"},
    {id:3, name:"Studio Wear", type:"MODA", imgID:"img-moda"}
 ]

 localStorage.setItem("Stores", JSON.stringify(stores))
}

let logedUser = JSON.parse(localStorage.getItem("LogedUser"));

if(!logedUser){
    window.location.href = "../pages/login.html";
}


let storesFather = document.querySelector(".stores-card")

stores.forEach(store => {
    let name = store.name;
    let type= store.type;
    let imgID = store.imgID

let fatherDiv = document.createElement("div")

let div = document.createElement("div");
let spanName = document.createElement("span");
let h3 = document.createElement("h3")

/*      <div id="img-boutique" class="cards">
                        <div>
                            <span>MODA</span>
                            <h3>Boutique Élite</h3>
                        </div>
                        <div class="button-remove">
                            <i class="ti ti-trash"></i>
                        </div>
                    </div> */


fatherDiv.classList.add("cards")
fatherDiv.id = imgID;

spanName.textContent = type;
h3.textContent = name;

fatherDiv.addEventListener("click", ()=>{
localStorage.setItem("storeID", JSON.stringify(store))
window.location.href = "store.html";
})

div.append(spanName, h3);

if(logedUser.type != "user"){
let delDiv = document.createElement("div")
delDiv.classList.add("button-remove")

let icon = document.createElement("i")
icon.classList.add("ti ti-trash")

delDiv.append(icon)
div.append(delDiv)


delDiv.addEventListener("click", (e)=>{
e.target.remove();
let storeDel = stores.findIndex(storetodel => storetodel.id == store.id)
stores.splice(storeDel, 1);
localStorage.setItem("Stores", JSON.stringify(stores))
})

}

fatherDiv.append(div)
storesFather.append(fatherDiv);

});


if(logedUser.type == "user"){
document.querySelector("#addBut").classList.add("userNoShow")
}

let logBut = document.querySelector("#logBut")

logBut.addEventListener("click", (e)=>{
e.preventDefault();
localStorage.removeItem("LogedUser")
window.location.href = "../pages/login.html";
})

let homeBut = document.querySelector("#homeBut")

homeBut.addEventListener("click", (e)=>{
e.preventDefault();
localStorage.removeItem("LogedUser")
window.location.href = "../index.html";
})


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