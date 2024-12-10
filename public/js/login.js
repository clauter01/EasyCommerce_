const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();


  if (form.checkValidity()) {
    const inputs = Object.fromEntries(new FormData(form));

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(response);
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      alert("logado com sucesso");
      window.location.href = "./index.html";
    } else {
      alert(data.message);
    }
  }
});
