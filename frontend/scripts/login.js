async function hashSenha(password) {
    const encoder = new TextEncoder();

    const data = encoder.encode(password);  //transforma em array de bit

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    //Algorítimo, processa e devolve array

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    //transfoma o array de hash, transfoma em hexadecimal, aruma problemas com bytes unicos, e uni em uma string
}

let form = document.querySelector("#form")

let users = JSON.parse(localStorage.getItem("users"));

if (!users) {
    users = [
        { name: "admin", email:"admin@gmail.com", password: await hashSenha("admin1234"), type: "admin" },
        { name: "user", email:"user@gmail.com", password: await hashSenha("1234"), type: "user" }
    ]
    localStorage.setItem("users", JSON.stringify(users))
}



form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formdata = new FormData(form);

    let formemail = formdata.get("email")
    if (!formemail) { alert("usuário não infomado"); return }

    let formPassword = formdata.get("password")
    if (!formPassword) { alert("Senha não informada"); return }

    let hashPassword = await hashSenha(formPassword);

    let LogedUser = users.find(user => user.email == formemail && user.password == hashPassword)

    if (LogedUser) {
        localStorage.setItem("LogedUser", JSON.stringify(LogedUser));
        window.location.href = "../pages/dashboard.html";
    }
    else {
        alert("Usuario ou Senha incorretos");
        return;
    }

})

