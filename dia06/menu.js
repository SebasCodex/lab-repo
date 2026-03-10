// Arreglo inicial de datos--
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "ARROZ CHAUFA", precio: 16, stock: 9 },
    { nombre: "CAUSA", precio: 20, stock: 15 }
];

export const obtenerMenu = () => menu;

export const agregarAlMenu = (plato) => {
    menu.push(plato);
};