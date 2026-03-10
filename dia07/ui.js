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

/* Parte C: Clasificacion visual segun el tipo de excepcion capturada */
export function mostrarMensaje(mensaje, tipo = "normal") {
    const output = document.getElementById("output");
    let color = "black";
    let prefijo = "";

    if (tipo === "procesando") { color = "blue"; prefijo = "[PROCESANDO] "; }
    else if (tipo === "negocio") { color = "orange"; prefijo = "[ADVERTENCIA] "; }
    else if (tipo === "sistema") { color = "red"; prefijo = "[ERROR SISTEMA] "; }
    else if (tipo === "exito") { color = "green"; prefijo = "[OK] "; }

    output.innerHTML = `<p style="color: ${color}; font-weight: bold;">${prefijo}${mensaje}</p>`;
}

export function setBotonesEstado(deshabilitado) {
    document.querySelectorAll("button").forEach(btn => btn.disabled = deshabilitado);
}