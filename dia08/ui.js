import { obtenerMenu } from './menu.js';
import { verificarEstadoGeneral } from './operaciones.js';

export function renderMenu() {
    const output = document.getElementById("output");
    const menu = obtenerMenu();
    output.innerHTML = "";

    let html = "<ul>";
    menu.forEach(plato => {
        let clase = plato.stock === 0 ? "agotado" : (plato.stock <= 3 ? "bajo" : "normal");
        html += `<li class="${clase}">
            <b>${plato.nombre}</b> - Precio: S/ ${plato.precio} - Stock: ${plato.stock}
        </li>`;
    });
    html += "</ul>" + verificarEstadoGeneral();
    output.innerHTML = html;
}

export function mostrarMensaje(mensaje, tipo = "normal") {
    const output = document.getElementById("output");
    let color = "black";

    if (tipo === "procesando") color = "blue";
    else if (tipo === "negocio" || tipo === "sistema") color = "red";
    else if (tipo === "exito") color = "green";

    output.innerHTML = `<h2 style="color: ${color}; font-weight: bold;">${mensaje}</h2>`;
}

export function setBotonesEstado(bloqueado) {
    document.querySelectorAll("button").forEach(btn => btn.disabled = bloqueado);
}

export function limpiarInput() {
    const input = document.getElementById("inputBuscar");
    if (input) input.value = "";
}

export function renderLista(titulo, items) {
    const output = document.getElementById("output");
    output.innerHTML = `<h3>${titulo}</h3><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
}