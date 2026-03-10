import { agregarAlMenu } from './menu.js';
import { renderMenu, renderLista, mostrarAlerta, obtenerInputBusqueda } from './ui.js';
import { venderPlato, filtrarStockBajo, buscarPlato } from './operaciones.js';

// Eventos--
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

document.getElementById("btnVender").addEventListener("click", () => {
    const nombre = obtenerInputBusqueda();
    const resultado = venderPlato(nombre);
    mostrarAlerta(resultado.msg);
    renderMenu();
});

document.getElementById("btnStockBajo").addEventListener("click", () => {
    const lista = filtrarStockBajo();
    const textos = lista.map(p => `${p.nombre} (Quedan: ${p.stock})`);
    renderLista("Platos con Stock Bajo", textos);
});

document.getElementById("btnResumen").addEventListener("click", () => {
    const textos = obtenerMenu().map(p => `${p.nombre} - S/. ${p.precio}`);
    renderLista("Resumen del Menú", textos);
});