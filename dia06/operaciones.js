import { obtenerMenu } from './menu.js';

export function venderPlato(nombreBusqueda) {
    const menu = obtenerMenu();
    const plato = menu.find(p => p.nombre.toLowerCase() === nombreBusqueda.toLowerCase());

    if (!plato) return { msg: "El plato no existe", tipo: "error" };
    if (plato.stock === 0) return { msg: "No disponible (Agotado)", tipo: "error" };

    plato.stock--;
    return { msg: `Venta realizada: ${plato.nombre}`, tipo: "success" };
}

export function verificarEstadoGeneral() {
    const menu = obtenerMenu();
    let agotados = 0;
    let bajoStock = 0;

    for (let i = 0; i < menu.length; i++) {
        if (menu[i].stock === 0) agotados++;
        else if (menu[i].stock <= 3) bajoStock++;
    }

    if (agotados > 0) return "<p>Hay platos agotados</p>";
    if (bajoStock > 0) return "<p>Hay platos con stock bajo</p>";
    return "<p>Todo disponible</p>";
}

export function filtrarStockBajo() {
    return obtenerMenu().filter(plato => plato.stock <= 3);
}

export function buscarPlato(nombre) {
    return obtenerMenu().find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}