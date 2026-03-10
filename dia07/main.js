import { obtenerMenu, agregarAlMenu } from './menu.js';
import { renderMenu, renderLista, mostrarMensaje, obtenerInputBusqueda, limpiarInput, setBotonesEstado } from './ui.js';
import { venderPlatoAsync, buscarPlato, filtrarStockBajo } from './operaciones.js';

document.getElementById("btnMostrar").addEventListener("click", renderMenu);

document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarAlMenu({ nombre: "Lomo saltado", precio: 18, stock: 3 });
    renderMenu();
});

document.getElementById("btnBuscar").addEventListener("click", () => {
    const nombre = obtenerInputBusqueda();
    const encontrado = buscarPlato(nombre);
    if (!encontrado) {
        renderLista("Resultados", ["No tenemos ese plato"]);
    } else {
        renderLista("Resultados", [`${encontrado.nombre} - S/ ${encontrado.precio}`]);
    }
});

document.getElementById("btnVender").addEventListener("click", async () => {
    const nombre = obtenerInputBusqueda();
    if (!nombre) return mostrarMensaje("Escribe un nombre", "error");

    try {
        setBotonesEstado(true);
        mostrarMensaje("Procesando pedido...", "procesando");

        const mensaje = await venderPlatoAsync(nombre);

        mostrarMensaje(mensaje, "exito");
        limpiarInput();
        setTimeout(renderMenu, 1500);
    } catch (error) {
        mostrarMensaje(error.message || error, "error");
    } finally {
        setBotonesEstado(false);
    }
});

document.getElementById("btnStockBajo").addEventListener("click", () => {
    const lista = filtrarStockBajo().map(p => `${p.nombre} (${p.stock})`);
    renderLista("Stock Bajo", lista);
});

document.getElementById("btnResumen").addEventListener("click", () => {
    const lista = obtenerMenu().map(p => `${p.nombre} - S/ ${p.precio}`);
    renderLista("Resumen", lista);
});