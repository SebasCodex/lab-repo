// 1) VARIABLES + OBJETOS + ARRAYS
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "ARROZ CHAUFA", precio: 16, stock: 9 },
    { nombre: "CAUSA", precio: 20, stock: 15 }
];

// 2) FUNCIÓN: renderizar (mostrar) el menú en pantalla
function renderMenu() {

    const output = document.getElementById("output");
    output.innerHTML = "";

    let html = "<ul>";

    for (let i = 0; i < menu.length; i++) {

        const plato = menu[i];
        let clase = "";

        if (plato.stock === 0) {
            clase = "agotado";
        }
        else if (plato.stock <= 3) {
            clase = "bajo";
        }
        else {
            clase = "normal";
        }

        html += `<li class="${clase}">
        <b>${plato.nombre}</b> — S/ ${plato.precio} — Stock: ${plato.stock}
        </li>`;

    }

    html += "</ul>";
    html += contarPlatos();
    html += verificarEstadoGeneral();

    output.innerHTML = html;
}

// 3) FUNCIONES DE LÓGICA

function verificarEstadoGeneral() {

    let agotados = 0;
    let bajoStock = 0;

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].stock === 0) {
            agotados++;
        }
        else if (menu[i].stock <= 3) {
            bajoStock++;
        }

    }

    if (agotados > 0) {
        return "<p>Hay platos agotados</p>";
    }

    if (bajoStock > 0) {
        return "<p>Hay platos con stock bajo</p>";
    }

    return "<p>Todo disponible</p>";
}

function agregarPlatoDemo() {
    const nuevoPlato = { nombre: "Lomo saltado", precio: 18, stock: 3 };
    menu.push(nuevoPlato);
}

function contarPlatos() {
    return `<p>En el menú hay ${menu.length} platos</p>`;
}

function filtrarStockBajo() {
    const bajoStock = menu.filter(plato => plato.stock <= 3);
    // Convertimos los objetos a strings para que renderLista los entienda
    const listaTextos = bajoStock.map(p => `${p.nombre} (Quedan: ${p.stock})`);
    renderLista("Platos con Stock Bajo", listaTextos);
}

function obtenerResumenMenu() {
    const resumen = menu.map(plato => `${plato.nombre} - S/. ${plato.precio}`);
    renderLista("Resumen del Menú", resumen);
}

function buscarPlatoPorNombre() {
    const nombreBusqueda = document.getElementById("inputBuscar").value.toLowerCase();

    // Buscamos ignorando mayúsculas/minúsculas para mejor experiencia
    const platoEncontrado = menu.find(p => p.nombre.toLowerCase() === nombreBusqueda);

    if (!platoEncontrado) {
        renderLista("Resultados encontrados", ["No tenemos ese plato"]);
    } else {
        renderLista("Resultados encontrados", [`${platoEncontrado.nombre} - S/ ${platoEncontrado.precio}`]);
    }
}

function renderLista(titulo, listaDeTextos) {
    const output = document.getElementById("output");
    output.innerHTML = "";

    let html = `<h3> ${titulo} </h3>`;
    html += "<ul>";
    for (let i = 0; i < listaDeTextos.length; i++) {
        const item = listaDeTextos[i];
        html += `<li>${item}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

function venderPlato() {

    const nombreBusqueda = document.getElementById("inputBuscar").value.toLowerCase();

    const plato = menu.find(p => p.nombre.toLowerCase() === nombreBusqueda);

    if (!plato) {
        alert("El plato no existe en el menú");
        return;
    }

    if (plato.stock === 0) {
        alert("No disponible");
        return;
    }

    plato.stock--;

    alert(`Venta realizada: ${plato.nombre}`);

    renderMenu();
}

// 4) EVENTOS: conectar botones con funciones
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});

document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});

document.getElementById("btnBuscar").addEventListener("click", () => {
    buscarPlatoPorNombre();
});

document.getElementById("btnStockBajo").addEventListener("click", () => {
    filtrarStockBajo();
});

document.getElementById("btnResumen").addEventListener("click", () => {
    obtenerResumenMenu();
});

document.getElementById("btnVender").addEventListener("click", venderPlato);