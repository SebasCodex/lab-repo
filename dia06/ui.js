import { obtenerMenu } from './menu.js';
import { verificarEstadoGeneral } from './operaciones.js';
//xD
export function renderMenu() {
    const output = document.getElementById("output");
    const menu = obtenerMenu();
    output.innerHTML = "";

    let html = "<ul>";
    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        let clase = "";

        if (plato.stock === 0) clase = "agotado";
        else if (plato.stock <= 3) clase = "bajo";
        else clase = "normal";

        html += `<li class="${clase}">
            <b>${plato.nombre}</b> — S/ ${plato.precio} — Stock: ${plato.stock}
        </li>`;
    }
    html += "</ul>";
    html += `<p>En el menú hay ${menu.length} platos</p>`;
    html += verificarEstadoGeneral();

    output.innerHTML = html;
}

export function renderLista(titulo, listaDeTextos) {
    const output = document.getElementById("output");
    let html = `<h3> ${titulo} </h3><ul>`;
    for (let texto of listaDeTextos) {
        html += `<li>${texto}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

export function mostrarAlerta(mensaje) {
    alert(mensaje);
}

export function obtenerInputBusqueda() {
    return document.getElementById("inputBuscar").value;
}