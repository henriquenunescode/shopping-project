const registerForm = document.querySelector("form")

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const nome = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const senha = document.querySelector("#password").value

    try {
        await apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                nome,
                email,
                senha
            })
        })

        alert("Cadastro realizado com sucesso!")
        window.location.href = "./login.html"
    } catch (error) {
        alert(error.message)
    }
})