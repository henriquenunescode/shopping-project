const token = localStorage.getItem("token")

if (!token) {
  alert("Você precisa estar logado")
  window.location.href = "./login.html"
}