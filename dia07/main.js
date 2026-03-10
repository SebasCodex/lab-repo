import {
    renderMenu,
    mostrarMensaje,
    setBotonesEstado,
    limpiarInput
} from './ui.js';

import {
    venderPlatoAsync,
    ErrorNegocio
} from './operaciones.js';

/* Evento para cargar y mostrar el menu inicial */
document.getElementById("btnMostrar").addEventListener("click", renderMenu);

/* Evento principal para la gestion de ventas */
document.getElementById("btnVender").addEventListener("click", async () => {
    /* Parte D: Captura y validacion de datos de entrada */
    const nombre = document.getElementById("inputBuscar").value.trim();
    const cantidadInput = document.getElementById("inputCantidad").value;
    const cantidad = parseInt(cantidadInput);

    /* Validaciones obligatorias antes de procesar */
    if (!nombre) {
        return mostrarMensaje("Debe ingresar el nombre de un plato.", "negocio");
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        return mostrarMensaje("La cantidad debe ser un numero mayor a cero.", "negocio");
    }

    try {
        /* Bloqueo de interfaz para evitar multiples peticiones */
        setBotonesEstado(true);
        mostrarMensaje("Enviando pedido al servidor...", "procesando");

        /* Parte B y E: Intento de venta asincrona */
        const respuestaServidor = await venderPlatoAsync(nombre, cantidad);

        /* Si la ejecucion llega aqui, la venta fue exitosa */
        mostrarMensaje(respuestaServidor, "exito");
        limpiarInput();
        renderMenu();

    } catch (error) {
        /* Parte C: Manejo diferenciado de errores */
        if (error instanceof ErrorNegocio) {
            /* Error de logica (ej: stock insuficiente) */
            mostrarMensaje(error.message, "negocio");
        } else {
            /* Error tecnico (ej: fallo de red) */
            mostrarMensaje("Fallo del sistema: " + error.message, "sistema");
        }

        /* Parte E: Refresco de interfaz para asegurar estado consistente */
        renderMenu();

    } finally {
        /* Liberacion de botones independientemente del resultado */
        setBotonesEstado(false);
    }
});

/* Renderizado inicial al cargar la pagina */
document.addEventListener("DOMContentLoaded", renderMenu);