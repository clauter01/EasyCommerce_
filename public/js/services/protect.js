const loadingDiv = document.getElementById("loading-div");
const contentDiv = document.getElementById("content-div");

window.addEventListener("load", async () => {
  if (token) {
    try{
        const response = await fetch("http://localhost:3000/auth/auth", {
            method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (json.auth) {
          loadingDiv.style.display = "none";
          contentDiv.style.display = "block";
        } else {
          window.location.href = "./index.html";
        }
    }catch(error){
      console.error("Erro:", error);
      loadingDiv.style.display = "none";
      alert("algo deu errado")
    }
  } else {
    alert("Você não está logado");
    window.location.href = "./login.html";
  }
});