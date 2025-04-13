const entregaSelect = document.getElementById("entrega");
    const aulaDiv = document.getElementById("aula-especifico");
    const resumenCarrito = document.getElementById("resumen-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    entregaSelect.addEventListener("change", () => {
    aulaDiv.style.display = entregaSelect.value === "Aula" ? "block" : "none";
    });

function mostrarResumenCarrito() {
    const carrito = JSON.parse(localStorage.getItem("cart")) || [];
    resumenCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${item.name}</span><span>S/ ${item.price.toFixed(2)}</span>`;
        resumenCarrito.appendChild(li);
        total += item.price;
    });

    totalCarrito.textContent = `Total: S/ ${total.toFixed(2)}`;
    }

    mostrarResumenCarrito();

    document.getElementById("confirmar-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const universidad = document.getElementById("universidad").value;
    const entrega = document.getElementById("entrega").value;
    const aula = document.getElementById("aula").value.trim();

    const carrito = JSON.parse(localStorage.getItem("cart")) || [];

      let mensaje = `🛍️ *Pedido de Minny and Cookies*%0A`;
    mensaje += `👤 Nombre: ${nombre}%0A`;
    mensaje += `🏫 Universidad: ${universidad}%0A`;
    mensaje += `📍 Entrega: ${entrega}${entrega === "Aula" ? " - " + aula : ""}%0A`;
    mensaje += `%0A🧁 *Productos:*%0A`;

    let total = 0;
    carrito.forEach(item => {
        mensaje += `• ${item.name} - S/ ${item.price.toFixed(2)}%0A`;
        total += item.price;
    });

    mensaje += `%0A💵 Total: S/ ${total.toFixed(2)}`;

    const telefono = "51993446468";
    window.location.href = `https://wa.me/${telefono}?text=${mensaje}`;
    });
