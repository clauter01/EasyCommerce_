//LOGIN AUTH LINK
const loginItem = document.getElementById("auth-link");
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userObj = JSON.parse(user);
if (token) {
  loginItem.innerHTML = `
    <a href="./profile.html">${userObj.name}</a>
    <button onclick="logout()">Sair</button>
  `;
} else {
  loginItem.innerHTML = `
    <a href="./login.html">Entrar</a>
    <a href="./register.html">Registrar</a>
  `;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "./index.html";
}