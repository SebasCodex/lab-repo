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
            <b>${plato.nombre}</b> — S/ ${plato.precio} — Stock: ${plato.stock}
        </li>`;
    });
    html += "</ul>" + verificarEstadoGeneral();
    output.innerHTML = html;
}

export function renderLista(titulo, listaDeTextos) {
    const output = document.getElementById("output");
    output.innerHTML = `<h3>${titulo}</h3><ul>${listaDeTextos.map(t => `<li>${t}</li>`).join('')}</ul>`;
}

export function mostrarMensaje(mensaje, tipo = "normal") {
    const output = document.getElementById("output");
    let color = "black";
    if (tipo === "procesando") color = "blue";
    else if (tipo === "error") color = "red";
    else if (tipo === "exito") color = "green";

    output.innerHTML = `<p style="color: ${color}; font-weight: bold;">${mensaje}</p>`;
}

export function obtenerInputBusqueda() {
    return document.getElementById("inputBuscar").value;
}

export function limpiarInput() {
    document.getElementById("inputBuscar").value = "";
}

export function setBotonesEstado(deshabilitado) {
    const botones = document.querySelectorAll("button");
    botones.forEach(btn => btn.disabled = deshabilitado);
}