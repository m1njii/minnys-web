document.addEventListener("DOMContentLoaded", () => {
    const resumenCarrito = document.getElementById("resumen-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const confirmarForm = document.getElementById("confirmar-form");
    const entregaSelect = document.getElementById("entrega");
    const aulaInput = document.getElementById("aula-especifico");
    const lugarSelect = document.getElementById("lugar");
    const lugarEspecificoInput = document.getElementById("lugar-especifico");
    const horaSelect = document.getElementById("hora");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function renderCarrito() {
        resumenCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.precio * (item.cantidad || 1);
            total += subtotal;

            const li = document.createElement("li");
            li.innerHTML = `
            ${item.nombre} x${item.cantidad || 1} - S/ ${subtotal.toFixed(2)}
            <button class="eliminar-item" data-index="${index}" style="margin: 0; padding: 0; width: 1rem; background: none;">❌</button>
            `;
            resumenCarrito.appendChild(li);
        });

        totalCarrito.textContent = `Total: S/ ${total.toFixed(2)}`;

        document.querySelectorAll(".eliminar-item").forEach(button => {
            button.addEventListener("click", () => {
                const index = parseInt(button.getAttribute("data-index"));
                carrito.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                renderCarrito();
            });
        });
    }

    renderCarrito();

    lugarSelect.addEventListener("change", () => {
        const lugar = lugarSelect.value;
        const horaSelect = document.getElementById("hora");

        // Mostrar campo de lugar específico en todos los casos válidos
        if (lugar === "UPN (Sede Chorrillos)" || lugar === "Universidad Autónoma" || lugar === "Otro lugar") {
            lugarEspecificoInput.style.display = "block";
        } else {
            lugarEspecificoInput.style.display = "none";
        }

        horaSelect.innerHTML = '<option value="">Seleccione un día y/o hora</option>';

        let opciones = [];

        if (lugar === "UPN (Sede Chorrillos)") {
            opciones = [
                "Lunes | 2:00pm - 5:40pm",
                "Martes | 10:00am - 2:00pm",
                "Jueves | 10:00am - 2:00pm",
                "Viernes | 12:00am - 1:30pm"
            ];
        } else if (lugar === "Universidad Autónoma") {
            opciones = [
                "Lunes | 8:00am - 12:00pm",
                "Miércoles | 8:00am - 12:00pm",
                "Jueves | 8:00am - 12:00pm",
                "Viernes | 8:00am - 12:00pm"
            ];
        } else if (lugar === "Otro lugar") {
            opciones = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
        }

        opciones.forEach(hora => {
            const option = document.createElement("option");
            option.value = hora;
            option.textContent = hora;
            horaSelect.appendChild(option);
        });
    });

    confirmarForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const lugar = lugarSelect.value;
        const lugarEspecifico = lugarEspecificoInput.value.trim();
        const hora = horaSelect.value;
        const pago = document.getElementById("pago").value;

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let total = 0;
        let productosMensaje = "";

        carrito.forEach(item => {
            const cantidad = item.cantidad || 1;
            const subtotal = item.precio * cantidad;
            total += subtotal;
            productosMensaje += `• ${item.nombre} x${cantidad} - S/ ${subtotal.toFixed(2)}\n`;
        });

        let mensaje = `Hola, soy ${nombre} y me gustaría hacer un pedido a Minny and Cookies.`;
        mensaje += ` Me encuentro en ${lugar} y deseo recibir el pedido en: ${lugarEspecifico}.`;
        mensaje += ` Podría recibirlo el día ${hora} y pagaré mediante ${pago}.`;
        mensaje += `\n\nEstoy solicitando los siguientes productos:\n${productosMensaje}`;
        mensaje += `\n\nEl total de mi pedido es S/ ${total.toFixed(2)}. ¡Gracias! 🍪🧁`;

        const telefono = "51935343336";
        const urlMensaje = encodeURIComponent(mensaje);
        window.location.href = `https://wa.me/${telefono}?text=${urlMensaje}`;
    });
});
