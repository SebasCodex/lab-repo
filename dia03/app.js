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

    // crear una lista HTML simple
    let html = "<ul>";

    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        html += `<li><b>${plato.nombre}</b> — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }

    html += "</ul>";
    html += contarPlatos();
    output.innerHTML = html;
}

// 3) FUNCIÓN: agregar un plato demo al menú
function agregarPlatoDemo() {
    const nuevoPlato = { nombre: "lomo saltado", precio: 18, stock: 3 };
    menu.push(nuevoPlato);
}

function contarPlatos() {
    return `<p> en el menú hay ${menu.length} platos </p>`;
}

function filtrarStockBajo() {
    return menu.filter(plato => plato.stock <= 3);
}

function obtenerResumenMenu() {
    return menu.map(plato => `${plato.nombre} - S/. ${plato.precio}`)
}

function buscarPlatoPorNombre(nombrePlato) {
    const plato = menu.find(platillos => platillos.nombre === nombrePlato);
    if (!plato) {
        renderLista("Resultados encontrados: ", ["No tenemos ese plato"])
        return;
    }
    renderLista("Resultados encontrados: ", plato)
    return;
}

function renderLista(titulo, listaDeTextos) {

    const output = document.getElementById("output")

    output.innerHTML = ""

    let html = `<h3> ${titulo} </h3>`
    html += "<ul>";


    for (let i = 0; i < listaDeTextos.length; i++) {
        const item = listaDeTextos[i];
        html += `<li>${item}</li>`

    }

    html += "</ul>"
    output.innerHTML = html;

}


// 4) EVENTOS: conectar botones con funciones
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});

document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});



renderLista("productos encontrados", plato)

