import { obtenerMenu } from './menu.js';

/* Parte A: Clase de error personalizada para reglas de negocio */
export class ErrorNegocio extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorNegocio";
    }
}

/* Simulacion de respuesta asincrona con probabilidad de fallo de sistema */
export function simularRespuestaServidor(resultado) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const falla = Math.random() < 0.3;
            if (falla) {
                reject(new Error("Fallo en la comunicacion con el servidor central."));
            } else {
                resolve(resultado);
            }
        }, 2000);
    });
}

/* Parte B y E: Validacion de entrada y mantenimiento de estado consistente */
export async function venderPlatoAsync(nombre, cantidad) {
    const menu = obtenerMenu();
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    /* Validaciones de logica de negocio antes de contactar al servidor */
    if (!plato) {
        throw new ErrorNegocio(`El producto "${nombre}" no se encuentra en el catalogo.`);
    }

    if (plato.stock < cantidad) {
        throw new ErrorNegocio(`Existencias insuficientes. Stock actual: ${plato.stock}`);
    }

    const mensajeExito = `Operacion confirmada: ${cantidad} unidad(es) de ${plato.nombre}`;

    /* Parte E: El stock no se altera hasta que el servidor confirma la operacion */
    const respuesta = await simularRespuestaServidor(mensajeExito);

    /* Actualizacion del estado local solo tras confirmacion exitosa */
    plato.stock -= cantidad;

    return respuesta;
}

export function verificarEstadoGeneral() {
    const menu = obtenerMenu();
    const agotados = menu.filter(p => p.stock === 0).length;
    const bajoStock = menu.filter(p => p.stock > 0 && p.stock <= 3).length;

    if (agotados > 0) return "<p style='color:red'>Alerta: Existen productos sin existencias.</p>";
    if (bajoStock > 0) return "<p style='color:orange'>Aviso: Existen productos con stock critico.</p>";
    return "<p style='color:green'>Estado nominal: Todos los productos disponibles.</p>";
}