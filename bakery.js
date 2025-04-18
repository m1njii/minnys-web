document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("total");
  const cartContainer = document.getElementById("cart");

  // Agrega producto al carrito
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      cart.push({ nombre: name, precio: price, cantidad: 1 });
      updateCart();
    });
  });

  // Actualiza el contenido del carrito
  function updateCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.precio;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.nombre} - S/ ${item.precio.toFixed(2)}
        <button class="remove-item" data-index="${index}">❌</button>
      `;
      cartItemsEl.appendChild(li);
    });

    cartCountEl.textContent = cart.length;
    totalEl.textContent = `Total: S/ ${total.toFixed(2)}`;

    // Botones para quitar elementos
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        cart.splice(index, 1);
        updateCart();
      });
    });
  }

  // Mostrar/ocultar carrito
  document.getElementById("toggle-cart").addEventListener("click", () => {
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
  });

  // Cerrar carrito
  document.getElementById("close-cart").addEventListener("click", () => {
    cartContainer.style.display = "none";
  });

  // Redirigir al checkout y guardar el carrito
  document.getElementById("checkout").addEventListener("click", () => {
    localStorage.setItem("carrito", JSON.stringify(cart)); // Guardar con clave coherente con cart.js
    window.location.href = "cart.html";
  });
});
