const cliente1 = {

    nombre: "pedro",
    dinero: 100,
    hambre: 50

}

const cliente2 = {

    nombre: "juan",
    dinero: 80,
    hambre: 40

}

function ordenarpedido(cliente) {

    if (cliente.hambre <= 0) {

        console.log("el cliente esta satisfecho")

    }

    else {

        cliente.hambre = cliente.hambre - 20

    }

}

function pagar(cliente, precio) {

    if (cliente.dinero >= precio) {

        cliente.dinero = cliente.dinero - precio

    }

    else {

        console.log("no tiene plata el usuario")

    }



}

function estado(usuario) {

    console.log("el dinero del usuario:" + usuario.dinero)
    console.log("su cantidad de hambre:" + usuario.hambre)
    console.log("el nombre del usuario es:" + usuario.nombre)



}

pagar(cliente1, 30)



