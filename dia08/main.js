import { renderMenu, renderLista, mostrarMensaje, setBotonesEstado, limpiarInput } from './ui.js';
import { venderPlatoAsync, buscarPlato, filtrarStockBajo, ErrorNegocio } from './operaciones.js';
import { agregarAlMenu, obtenerMenu } from './menu.js';

document.getElementById("btnMostrar").addEventListener("click", renderMenu);

document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarAlMenu({ nombre: "Plato Demo", precio: 15, stock: 5 });
    renderMenu();
});

document.getElementById("btnBuscar").addEventListener("click", () => {
    const nombre = document.getElementById("inputBuscar").value.trim();
    const plato = buscarPlato(nombre);
    if (plato) {
        renderLista("Resultado", [`${plato.nombre} - Stock: ${plato.stock}`]);
    } else {
        mostrarMensaje("Procesando error: Plato no encontrado.", "negocio");
    }
});

document.getElementById("btnVender").addEventListener("click", async () => {
    const nombre = document.getElementById("inputBuscar").value.trim();

    if (!nombre) return mostrarMensaje("Procesando error: Ingrese nombre.", "negocio");

    try {
        setBotonesEstado(true);
        mostrarMensaje("Procesando...", "procesando");

        const respuesta = await venderPlatoAsync(nombre, 1);

        mostrarMensaje(respuesta, "exito");
        limpiarInput();

        setTimeout(renderMenu, 2000);

    } catch (error) {
        if (error instanceof ErrorNegocio) {
            mostrarMensaje(error.message, "negocio");
        } else {
            mostrarMensaje("Procesando error: " + error.message, "sistema");
        }
        setTimeout(renderMenu, 2000);
    } finally {
        setBotonesEstado(false);
    }
});

document.getElementById("btnStockBajo").addEventListener("click", () => {
    const items = filtrarStockBajo().map(p => `${p.nombre} (${p.stock})`);
    renderLista("Stock Bajo", items.length ? items : ["Sin alertas"]);
});

document.getElementById("btnResumen").addEventListener("click", () => {
    const items = obtenerMenu().map(p => `${p.nombre} - S/ ${p.precio}`);
    renderLista("Resumen", items);
});

document.addEventListener("DOMContentLoaded", renderMenu);