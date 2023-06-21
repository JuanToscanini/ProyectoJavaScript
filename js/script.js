const intentos = 3;
function login(salida) {
    let i = 0;
    salida = false;
    for (let i = 1; i <= intentos; i++) {
        let usuario = prompt("Ingrese su usuario (usuario para true)");
        let contrasenia = prompt("Ingrese su contraseña (123 para true)");
        if ((usuario == ("usuario")) && (contrasenia == ("123"))) {
            alert("Buen dia " + usuario);
            salida = true;
            return salida;
        } else {
            alert("Ingrese un usuario valido, le quedan " + (intentos - i) + " intentos");

        }
        if (i == intentos) {
            alert("Ha alcanzado el limite de intentos");
            window.close(); 
            return salida;
        }
    }
}

class Perfume {
    constructor(nombre, marca, tamanio, genero, tipo, precio, id) {
        this.nombre = nombre;
        this.marca = marca;
        this.tamanio = tamanio;
        this.genero = genero;
        this.tipo = tipo;
        this.precio = precio;
        this.id = id;
    }
}
const perfumes = [
    new Perfume('Boss Bottled', 'HUGO BOSS', '50', 'masculino', 'Parfum', '43300', '1'),
    new Perfume('Boss Alive', 'HUGO BOSS', '50', 'femenino', 'Parfum', '44000', '2'),
    new Perfume('Boss Alive', 'HUGO BOSS', '80', 'femenino', 'Parfum', '57000', '3'),
    new Perfume('ACQUA DI GIO HOMME ', 'ARMANI', '100', 'masculino', 'Toilette', '48900', '4'),
    new Perfume('ACQUA DI GIO HOMME ABSOLU', 'ARMANI', '200', 'masculino', 'Parfum', '64000', '5'),
    new Perfume('One Million', 'Paco Rabanne', '100', 'masculino', 'Toilette', '47700', '6'),
    new Perfume('One Million', 'Paco Rabanne', '200', 'masculino', 'Toilette', '69200', '7'),
    new Perfume('Invictus', 'Paco Rabanne', '50', 'masculino', 'Toilette', '40500', '8'),
    new Perfume('Invictus', 'Paco Rabanne', '100', 'masculino', 'Toilette', '47500', '9'),
    new Perfume('Bad Boy', 'Carolina Herrera', '50', 'masculino', 'Parfum', '44900', '10'),
    new Perfume('Eros', 'Versace', '200', 'masculino', 'Toilette', '68400', '11')
]

function calculodescuento(monto) {
    let montoDescuentoFinal;
    if (monto > 44000) {
        let descuento = monto * 0.1;
        montoDescuentoFinal = monto - descuento;
    } else {
        montoDescuentoFinal = monto;
    }
    return montoDescuentoFinal;
}

function calculocuotas(monto, cantcuotas) {
    let valorCuota = monto / cantcuotas
    if (cantcuotas <= 0) {
        alert("El numero minimo de cuotas es 1")
    } else
        return valorCuota
}

function comprarPerfume(perfumes) {
    let condicionalCompra = true
    let perfumeSeleccionadosuma = 0
    let contadorSeleccionadosSuma = 0
    while (condicionalCompra) {
        let texto = "";
        let contadoPerfumes = 0;
        perfumes.forEach(perfume => {
            contadoPerfumes++;
            texto += contadoPerfumes + "-" + perfume.nombre + " " + perfume.marca + " " + perfume.tamanio + " ml" + "\n"
        });
        const numeroPerfumeSeleccionado = parseInt(prompt(texto));
        if (!(numeroPerfumeSeleccionado>=1 && numeroPerfumeSeleccionado<=perfumes.length)){
            return alert ("Ingrese una opcion valida")
        }
        let perfumeSeleccionado = perfumes.find((perfume) => perfume.id == numeroPerfumeSeleccionado);
        perfumeSeleccionadosuma = perfumeSeleccionadosuma + parseInt(perfumeSeleccionado.precio);
        contadorSeleccionadosSuma++
        const continuarCompra = prompt("1- Si desea terminar la compra\n2- Si quiere seguir comprando ")
        if (continuarCompra == "1") {
            const medioDePago = prompt("1- Si desea pagar con efectivo (10% descuento con compra mayor a $44000)\n2- Si desea pagar con credito/debito ")
            switch (medioDePago) {
                case "1":
                    const precioFinal = calculodescuento(perfumeSeleccionadosuma);
                    alert("Ha realizado la compra de " + contadorSeleccionadosSuma + " producto/s\nmonto total de $" + precioFinal)
                    condicionalCompra = false
                    break
                case "2":
                    const cantcuotas = parseInt(prompt("Ingrese la cantidad de cuotas que desea:"))
                    const precioCuota = parseInt(calculocuotas(perfumeSeleccionadosuma, cantcuotas));
                    alert("Ha realizado la compra de " + contadorSeleccionadosSuma + " producto/s\nnumero total de " + cantcuotas + " cuotas\nCon un precio por cuota de $" + precioCuota)
                    condicionalCompra = false
                    break
                    default:
                        alert ("Ingrese una opcion valida")
            }
        } else if (continuarCompra == "2") {
            condicionalCompra = true
        } else {
            condicionalCompra = false
        }
    }
}

let salida = false;
function menuProgramaPrincipal(){
    if (login(salida) == true) {
        let texto = prompt("1- Ver productos\n0- SALIR");
        while (texto != 0) {
            switch (texto) {
                case "1":
                    comprarPerfume(perfumes);
                    break;
                case "2":
    
                case "0": break;
                default:
                    alert("Ingrese una opción válida.");
            }
            texto = prompt("1 - Listado de perfumes\n0 - para salir ");
        }
    }
    
};

menuProgramaPrincipal();