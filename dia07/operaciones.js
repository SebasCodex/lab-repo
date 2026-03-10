import { obtenerMenu } from './menu.js';

export function simularRespuestaServidor(resultado) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const falla = Math.random() < 0.3;
            if (falla) {
                reject("Error del servidor simulado.");
            } else {
                resolve(resultado);
            }
        }, 2000);
    });
}

export function venderPlato(nombre) {
    const menu = obtenerMenu();
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!plato) return { ok: false, mensaje: "El plato no existe" };
    if (plato.stock === 0) return { ok: false, mensaje: "No hay stock disponible" };

    plato.stock--;
    return { ok: true, mensaje: `Venta exitosa: ${plato.nombre}` };
}

export async function venderPlatoAsync(nombre) {
    const resultado = venderPlato(nombre);

    if (!resultado.ok) {
        throw new Error(resultado.mensaje);
    }

    const respuesta = await simularRespuestaServidor(resultado.mensaje);
    return respuesta;
}

export function verificarEstadoGeneral() {
    const menu = obtenerMenu();
    const agotados = menu.filter(p => p.stock === 0).length;
    const bajoStock = menu.filter(p => p.stock > 0 && p.stock <= 3).length;

    if (agotados > 0) return "<p>Hay platos agotados</p>";
    if (bajoStock > 0) return "<p>Hay platos con stock bajo</p>";
    return "<p>Todo disponible</p>";
}

export function buscarPlato(nombre) {
    return obtenerMenu().find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

export function filtrarStockBajo() {
    return obtenerMenu().filter(p => p.stock <= 3);
}