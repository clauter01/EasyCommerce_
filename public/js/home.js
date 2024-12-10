async function loadProducts() {
  const response = await fetch("http://localhost:3000/home/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  if (response.ok) {
    const products = document.getElementById("product-container");
    products.innerHTML = "";

    data.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product-card");
      productElement.innerHTML = `
        <img src="${product.image_Url}" alt="Produto 1">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        `;
      products.appendChild(productElement);
    });
  } else {
    alert(data.message);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
