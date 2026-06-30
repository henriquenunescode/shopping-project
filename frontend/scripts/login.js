localStorage.removeItem("token")
localStorage.removeItem("user")

const loginForm = document.querySelector("form")

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault()

  const email = document.querySelector("#email").value
  const senha = document.querySelector("#password").value

  try {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        senha
      })
    })

    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))

    window.location.href = "./dashboard.html"
  } catch (error) {
    alert(error.message)
  }
})