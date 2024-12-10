const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (form.checkValidity()) {

  const inputs = Object.fromEntries(new FormData(form));

  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(inputs),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    alert("erro ao criar usuario");
  } else {
    alert("agora faça login para entrar na sua conta")
    window.location.href = "./login.html";
  }
}});
