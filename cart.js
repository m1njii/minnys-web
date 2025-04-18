document.addEventListener("DOMContentLoaded", () => {
    const resumenCarrito = document.getElementById("resumen-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const confirmarForm = document.getElementById("confirmar-form");
    const entregaSelect = document.getElementById("entrega");
    const aulaInput = document.getElementById("aula-especifico");
    const universidadSelect = document.getElementById("universidad");
    const horaSelect = document.getElementById("hora");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function renderCarrito() {
    resumenCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement("li");
        li.innerHTML = `
        ${item.nombre} - S/ ${item.precio.toFixed(2)}
        <button class="eliminar-item" data-index="${index}" style="margin: 0; padding: 0; width: 1rem; background: none;">❌</button>
        `;
        resumenCarrito.appendChild(li);
    });

    totalCarrito.textContent = `Total: S/ ${total.toFixed(2)}`;
    }

    mostrarResumenCarrito();

    entregaSelect.addEventListener("change", () => {
    aulaInput.style.display = entregaSelect.value === "Aula" ? "block" : "none";
    });

    universidadSelect.addEventListener("change", () => {
    const universidad = universidadSelect.value;
    horaSelect.innerHTML = '<option value="">Seleccione una hora</option>';

    let opciones = [];

    if (universidad === "UPN (Sede Chorrillos)") {
        opciones = [
        "Lunes | 2:00pm - 5:40pm",
        "Martes | 10:00am - 2:00pm",
        "Jueves | 10:00am - 2:00pm",
        "Viernes | 12:00am - 1:30pm"
        ];
    } else if (universidad === "Universidad Autónoma") {
        opciones = [
        "Lunes | 8:00am - 12:00pm",
        "Miércoles | 8:00am - 12:00pm",
        "Jueves | 8:00am - 12:00pm",
        "Viernes | 8:00am - 12:00pm"
        ];
    }

    opciones.forEach(hora => {
        const option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });
    });

    document.getElementById("confirmar-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const universidad = document.getElementById("universidad").value;
    const entrega = document.getElementById("entrega").value;
    const aula = document.getElementById("aula").value.trim();
    const hora = document.getElementById("hora").value.trim();
    const pago = document.getElementById("pago").value;

    const carrito = JSON.parse(localStorage.getItem("cart")) || [];

      let mensaje = `🛍️ *Pedido de Minny's Bakery*%0A`;
    mensaje += `👤 Nombre: ${nombre}%0A`;
    mensaje += `🏫 Universidad: ${universidad}%0A`;
    mensaje += `📍 Entrega: ${entrega}${entrega === "Aula" ? " - " + aula : ""}%0A`;
    mensaje += `🕰️ Hora: ${hora}%0A`
    mensaje += `💸 Método de pago: ${pago}%0A`
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
