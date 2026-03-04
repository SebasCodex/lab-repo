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
    output.innerHTML = ""; // limpiar

    let html = "<ul>";
    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        html += `<li><b>${plato.nombre}</b> — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }
    html += "</ul>";
    html += contarPlatos();
    output.innerHTML = html;
}

// 3) FUNCIONES DE LÓGICA
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
    const cantidadAVender = 1;

    const plato = menu.find(p => p.nombre.toLowerCase() === nombreBusqueda);

    if (plato) {
        if (plato.stock >= cantidadAVender) {
            plato.stock -= cantidadAVender;
            alert(`¡Venta exitosa! Se vendió 1 ${plato.nombre}`);
        } else {
            alert("Stock insuficiente");
        }
    } else {
        alert("El plato no existe en el menú");
    }

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