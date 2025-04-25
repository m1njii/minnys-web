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
      // Verificar si el producto ya está en el carrito
      const existingItem = cart.find(item => item.nombre === name);
      if (existingItem) {
        existingItem.cantidad += 1; // Si ya está, aumentar la cantidad
      } else {
        cart.push({ nombre: name, precio: price, cantidad: 1 });
      }
      updateCart();
    });
  });

  // Actualiza el contenido del carrito
  function updateCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.precio * item.cantidad; // Calcula el total

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.nombre} - S/ ${item.precio.toFixed(2)} x 
        <button class="decrement" data-index="${index}">-</button>
        <span class="quantity">${item.cantidad}</span>
        <button class="increment" data-index="${index}">+</button>
        <button class="remove-item" data-index="${index}">❌</button>
      `;
      cartItemsEl.appendChild(li);
    });

    cartCountEl.textContent = cart.length;
    totalEl.textContent = `Total: S/ ${total.toFixed(2)}`;

    // Actualizar cantidades
    document.querySelectorAll(".decrement").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        if (cart[index].cantidad > 1) {
          cart[index].cantidad -= 1;
          updateCart();
        }
      });
    });

    document.querySelectorAll(".increment").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        cart[index].cantidad += 1;
        updateCart();
      });
    });

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
