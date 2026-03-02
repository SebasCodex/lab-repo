const jugador = {
    nombre: "Aragorn",
    vida: 100,
    fuerza: 15,
    nivel: 1
};

function recibirDaño(cantidad) {
    jugador.vida -= cantidad;
    if (jugador.vida <= 0) {
        jugador.vida = 0;
        console.log(jugador.nombre + " ha sido derrotado");
    } else {
        console.log(jugador.nombre + " tiene " + jugador.vida + " de vida");
    }
}

function curar(puntos) {
    jugador.vida += puntos;
    if (jugador.vida > 100) {
        jugador.vida = 100;
    }
    console.log(jugador.nombre + " se recuperó a " + jugador.vida);
}

function subirNivel() {
    jugador.nivel++;
    jugador.fuerza += 10;
    jugador.vida = 100;
    console.log("Subida de nivel: " + jugador.nivel + ". Fuerza actual: " + jugador.fuerza);
}

recibirDaño(40);
curar(10);
subirNivel();
recibirDaño(50);
console.log(jugador);