let nombre1 = "jugador_01";
let salud1 = 100;
let energia1 = 50;
let defendiendo1 = false;


let nombre2 = "jugador_02";
let salud2 = 100;
let energia2 = 50;
let defendiendo2 = false;

function atacar(atacante) {

    if (atacante === 1) {

        if (energia1 >= 10) {

            let daño = 20

            energia1 = energia1 - 10

            if (defendiendo2 === true) {
                daño = daño / 2
                defendiendo2 = false
            }

            salud2 = salud2 - daño
            console.log(nombre1 + " ataco e hizo " + daño + " de daño")



        }

        else {
            console.log(nombre1 + " no tiene energia")
        }

    }

    if (atacante === 2) {

        if (energia2 >= 10) {
            let daño = 20
            energia2 = energia2 - 10

            if (defendiendo1) {
                daño = daño / 2
                defendiendo1 = false
            }

            salud1 = salud1 - daño
            console.log(nombre2 + " ataco e hizo " + daño + " de daño")
        }

        else {
            console.log(nombre2 + " no tiene energia")
        }

    }


}

function defender(jugador) {

    if (jugador === 1) {
        defendiendo1 = true
        console.log(nombre1 + " se defendio")
    }

    if (jugador === 2) {
        defendiendo2 = true
        console.log(nombre2 + " se defendio")
    }
}

function recargar(jugador) {

    if (jugador === 1) {
        energia1 = energia1 + 15
        console.log(nombre1 + " recargo energia")

    }
    if (jugador === 2) {
        energia2 = energia2 + 15
        console.log(nombre2 + " recargo energia")
    }



}


function estado() {

    console.log(nombre1 + " tiene " + salud1 + " de salud y " + energia1 + " de energia")
    console.log(nombre2 + " tiene " + salud2 + " de salud y " + energia2 + " de energia")

}





