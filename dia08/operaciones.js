import { obtenerMenu } from './menu.js';

export class ErrorNegocio extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorNegocio";
    }
}

export function simularRespuestaServidor(resultado) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const falla = Math.random() < 0.3;
            if (falla) {
                reject(new Error("Fallo de red al procesar pedido."));
            } else {
                resolve(resultado);
            }
        }, 2000);
    });
}

export async function venderPlatoAsync(nombre, cantidad) {
    const menu = obtenerMenu();
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!plato) throw new ErrorNegocio("Procesando error: El plato no existe.");
    if (plato.stock < cantidad) throw new ErrorNegocio("Procesando error: No hay existencias.");

    const respuesta = await simularRespuestaServidor("Venta exitosa");

    plato.stock -= cantidad;
    return respuesta;
}

export function verificarEstadoGeneral() {
    const menu = obtenerMenu();
    const agotados = menu.filter(p => p.stock === 0).length;
    const bajoStock = menu.filter(p => p.stock > 0 && p.stock <= 3).length;

    if (agotados > 0) return "<p style='color:red'>Aviso: Existen productos sin existencias.</p>";
    if (bajoStock > 0) return "<p style='color:orange'>Aviso: Existen productos con stock critico.</p>";
    return "<p style='color:green'>Estado nominal: Todos los productos disponibles.</p>";
}

export function buscarPlato(nombre) {
    return obtenerMenu().find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

export function filtrarStockBajo() {
    return obtenerMenu().filter(p => p.stock <= 3);
}