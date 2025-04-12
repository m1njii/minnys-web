
  const cart = [];
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("total");
  const cartContainer = document.getElementById("cart");

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      cart.push({ name, price });
      updateCart();
    });
  });

  function updateCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - S/ ${item.price.toFixed(2)}
        <button class="remove-item" data-index="${index}">❌</button>
      `;
      cartItemsEl.appendChild(li);
    });

    cartCountEl.textContent = cart.length;
    totalEl.textContent = `Total: S/ ${total.toFixed(2)}`;

    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        cart.splice(index, 1);
        updateCart();
      });
    });
  }

  document.getElementById("toggle-cart").addEventListener("click", () => {
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
  });

  document.getElementById("close-cart").addEventListener("click", () => {
    cartContainer.style.display = "none";
  });

  // 👉 Este es el botón que redirige y guarda el carrito
  document.getElementById("checkout").addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
  });
