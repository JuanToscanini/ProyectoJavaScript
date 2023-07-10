
class Perfume {
    constructor(nombre, marca, tamanio, genero, tipo, precio, id, stock, rutaImagen) {
        this.nombre = nombre;
        this.marca = marca;
        this.tamanio = tamanio;
        this.genero = genero;
        this.tipo = tipo;
        this.precio = precio;
        this.id = id;
        this.stock = stock
        this.rutaImagen = rutaImagen;
    }

    agregarItem() {
        carrito.agregarPerfume(this);
    }
}

const perfumes = [
    new Perfume('Boss Bottled', 'HUGO BOSS', '50', 'masculino', 'Parfum', '43300', '1', '18', "bossbottled.jpg"),
    new Perfume('Boss Alive', 'HUGO BOSS', '50', 'femenino', 'Parfum', '44000', '2', '25', "bossalive1.jpg"),
    new Perfume('Boss Alive', 'HUGO BOSS', '80', 'femenino', 'Parfum', '57000', '3', '11', "bossalive2.jpg"),
    new Perfume('ACQUA DI GIO HOMME ', 'ARMANI', '100', 'masculino', 'Toilette', '48900', '4', '21', "acqua1.jpeg"),
    new Perfume('ACQUA DI GIO HOMME ABSOLU', 'ARMANI', '200', 'masculino', 'Parfum', '64000', '5', '13', "acquaabsolu.jpg"),
    new Perfume('One Million', 'Paco Rabanne', '100', 'masculino', 'Toilette', '47700', '6', '11', "onemillion1.jpg"),
    new Perfume('One Million', 'Paco Rabanne', '200', 'masculino', 'Toilette', '69200', '7', '8', "onemillion2.jpg"),
    new Perfume('Invictus', 'Paco Rabanne', '50', 'masculino', 'Toilette', '40500', '8', '16', "invictus.jpg"),
    new Perfume('Invictus', 'Paco Rabanne', '100', 'masculino', 'Toilette', '47500', '9', '10', "invictus1.jpg"),
    new Perfume('Bad Boy', 'Carolina Herrera', '50', 'masculino', 'Parfum', '44900', '10', '18', "badboy.jpg"),
    new Perfume('Eros', 'Versace', '200', 'masculino', 'Toilette', '68400', '11', '12', "eros.jpg")
];


// funciones para decorar 
const bienvenida = document.getElementById('bienvenidaId');
function ocultarElemento() {
    bienvenida.style.display = 'none'
}
setTimeout(ocultarElemento, 20000);
// contenido de DOM

let carritoA = []
let contenedorPerfumes = document.getElementById("contenedor");
renderizar(perfumes);

let carritoJSON = JSON.parse(localStorage.getItem("carritoA"));

if (carritoJSON) {
    carritoA = carritoJSON;
    renderizarCarrito();
}


function renderizar(perfumes) {
    contenedorPerfumes.innerHTML = ""
    perfumes.forEach(perfume => {
        let mensaje = "Unidades: " + perfume.stock
        if (perfume.stock < 10) {
            mensaje = "Ultimas unidades disponibles"
        }
        let tarjetaPerfume = document.createElement("div")
        tarjetaPerfume.clasname = "tarjetaPerfume"
        tarjetaPerfume.innerHTML = `
    <h2 class= "fuenteH2">   ${perfume.nombre} </h2>  
    <img class="imagen" src="./imagenes/${perfume.rutaImagen}" alt="">
    <p class= "textoInfo"> ${mensaje} </p>
    <p class= "textoInfo textoInfoPrecio">$ ${perfume.precio}
    <button id=${perfume.id} class="textoInfoBoton">Agregar al carrito</button>`

        contenedorPerfumes.appendChild(tarjetaPerfume);
        let botonAgregarAlCarrito = document.getElementById(perfume.id)
        botonAgregarAlCarrito.addEventListener("click", agregarAlCarrito)

    })
}

function agregarAlCarrito(e) {
    let perfumeBuscado = perfumes.find(perfume => perfume.id == e.target.id);

    if (perfumeBuscado.stock > 0) {
        carritoA.push(perfumeBuscado);
        guardarCarritoEnLocalStorage();
        renderizarCarrito();
        perfumeBuscado.stock--;
        renderizar(perfumes);
        Swal.fire({
            title: 'Se ha agregado al carrito correctamente',
            icon: 'success'
        });
    } else {
        Swal.fire({
            title: 'No disponible',
            text: 'Lo sentimos, este producto no esta disponible en stock.',
            icon: 'error'
        });
    }
}
function reiniciarStock() {
    carritoA.forEach(perfume => {
        let perfumeOriginal = perfumes.find(p => p.id === perfume.id);
        perfumeOriginal.stock++;
    });
}
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carritoA", JSON.stringify(carritoA));
}
function renderizarCarrito() {
    let carritoFisico = document.getElementById("carrito");
    carritoFisico.innerHTML = "";
    carritoA.forEach(perfume => {
        carritoFisico.innerHTML += `
        <div class="col">
          <div class="card">
            <div class="row">
              <p>${perfume.nombre} - $ ${perfume.precio}</p>
              <div><img class="cartImg" src="./imagenes/${perfume.rutaImagen}" alt=""></div>
            </div>
          </div>
        </div>
      `;
    });
}

function limpiarLocalStorage() {
    if (carritoA.length <= 0) {
        Swal.fire({
            title: 'Error',
            text: 'No hay productos en el carrito',
            icon: 'error'
        });
    } else {
        Swal.fire({
            title: 'Pago realizado',
            text: 'Gracias por comprar en nuestra tienda',
            icon: 'success'
        });
        reiniciarStock(); 
        localStorage.removeItem("carritoA");
        carritoA = [];
        renderizarCarrito();
    }
}

let botonPagar = document.getElementById("botonPagar")
botonPagar.addEventListener("click", limpiarLocalStorage);

// 
let input = document.getElementById("miInput");

let boton = document.getElementById("miBoton");

input.addEventListener("input", () => filtrarYRenderizar(perfumes, input.value));

function filtrarYRenderizar(arrayDePerfumes, valorFiltro) {
    let perfumesFiltrados = arrayDePerfumes.filter(perfume => perfume.nombre.toLowerCase().includes(valorFiltro))
    renderizar(perfumesFiltrados)
}
//
function filtrarYRenderizarPorCategoriaGenero(e) {
    let perfumesFiltrados = perfumes.filter(perfume => perfume.genero === e.target.value)
    renderizar(perfumesFiltrados)
}
function filtrarYRenderizarPorCategoriaTipo(e) {
    let perfumesFiltrados = perfumes.filter(perfume => perfume.tipo === e.target.value)
    renderizar(perfumesFiltrados)
}

let botonesFiltroTipo = document.getElementsByClassName("filtroTipo") //tipo de fragancia
let botonesFiltros = document.getElementsByClassName("filtroGenero") //genero
for (const botonFiltro of botonesFiltros) {
    botonFiltro.addEventListener("click", filtrarYRenderizarPorCategoriaGenero)
}
for (const botonFiltro of botonesFiltroTipo) {
    botonFiltro.addEventListener("click", filtrarYRenderizarPorCategoriaTipo)
}

// 

let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarOcultar)
let botonVolverAProductos = document.getElementById("volverAProductos")
botonVolverAProductos.addEventListener("click", mostrarOcultar)
// 
function mostrarOcultar() {
    let padreContenedor = document.getElementById("productos")
    let carrito1 = document.getElementById("carrito")
    botonPagar.classList.toggle("oculto")
    padreContenedor.classList.toggle("oculto")
    carrito1.classList.toggle("oculto")
    botonVolverAProductos.classList.toggle("oculto")
    botonCarrito.classList.toggle("oculto")

}

// 
renderizar(perfumes)
//login();
// menuProgramaPrincipal();

// const intentos = 3;
// function login(salida) {
//     let i = 0;
//     salida = false;
//     for (let i = 1; i <= intentos; i++) {
//         let usuario = prompt("Ingrese su usuario:");
//         let contrasenia = prompt("Ingrese su contraseña (123 para true)");
//         if ((contrasenia == ("123"))) {
//             let contenedorNombre = document.getElementById("nombre")
//             contenedorNombre.innerText = (usuario)
//             salida = true;
//             return salida;
//         } else {
//             alert("Ingrese un usuario valido, le quedan " + (intentos - i) + " intentos");

//         }
//         if (i == intentos) {
//             alert("Ha alcanzado el limite de intentos");
//             window.close();
//             return salida;
//         }
//     }
// }

// class Carrito {
//     constructor() {
//         this.carro = [];
//     }

//     agregarPerfume(perfume) {
//         if (perfume.stock > 0) {
//             this.carro.push(perfume);
//             perfume.stock--;
//             alert("El perfume ha sido agregado al carrito.");
//         } else {
//             alert("Lo sentimos, el perfume seleccionado no está disponible en stock.");
//         }
//     }


//     mostrarCarrito() {
//         if (this.carro.length === 0) {
//             alert("El carrito está vacío.");
//         } else {
//             let texto = "Productos en el carrito:\n";
//             this.carro.forEach((perfume, index) => {
//                 texto += `${index + 1}. ${perfume.nombre} - ${perfume.marca} - Precio: $${perfume.precio}\n`;
//             });
//             alert(texto);
//         }
//     }
// }


// const carrito = new Carrito();

// function calculodescuento(monto) {
//     let montoDescuentoFinal;
//     if (monto > 44000) {
//         let descuento = monto * 0.1;
//         montoDescuentoFinal = monto - descuento;
//     } else {
//         montoDescuentoFinal = monto;
//     }
//     return montoDescuentoFinal;
// }

// function calculocuotas(monto, cantcuotas) {
//     let valorCuota = monto / cantcuotas;
//     if (cantcuotas <= 0) {
//         alert("El número mínimo de cuotas es 1");
//     } else {
//         return valorCuota;
//     }
// }

// function comprarPerfume(perfumes) {
//     let condicionalCompra = true;
//     let perfumeSeleccionadosuma = 0;
//     let contadorSeleccionadosSuma = 0;
//     while (condicionalCompra) {
//         let texto = "";
//         let contadoPerfumes = 0;
//         perfumes.forEach(perfume => {
//             contadoPerfumes++;
//             texto += contadoPerfumes + "-" + perfume.nombre + " " + perfume.marca + " " + perfume.tamanio + " ml" + "\n";
//         });
//         const numeroPerfumeSeleccionado = parseInt(prompt(texto));
//         if (!(numeroPerfumeSeleccionado >= 1 && numeroPerfumeSeleccionado <= perfumes.length)) {
//             return alert("Ingrese una opcion valida");
//         }
//         let perfumeSeleccionado = perfumes.find((perfume) => perfume.id == numeroPerfumeSeleccionado);
//         perfumeSeleccionado.agregarItem();
//         perfumeSeleccionadosuma = perfumeSeleccionadosuma + parseInt(perfumeSeleccionado.precio);
//         contadorSeleccionadosSuma++;
//         const continuarCompra = prompt("1- Si desea terminar la compra\n2- Si quiere seguir comprando ");
//         if (continuarCompra == "1") {
//             const medioDePago = prompt("1- Si desea pagar con efectivo (10% descuento con compra mayor a $44000)\n2- Si desea pagar con crédito/debito ");
//             switch (medioDePago) {
//                 case "1":
//                     const precioFinal = calculodescuento(perfumeSeleccionadosuma);
//                     alert("Ha realizado la compra de " + contadorSeleccionadosSuma + " producto/s\nmonto total de $" + precioFinal);
//                     condicionalCompra = false;
//                     break;
//                 case "2":
//                     const cantcuotas = parseInt(prompt("Ingrese la cantidad de cuotas que desea:"));
//                     const precioCuota = parseInt(calculocuotas(perfumeSeleccionadosuma, cantcuotas));
//                     alert("Ha realizado la compra de " + contadorSeleccionadosSuma + " producto/s\nnumero total de " + cantcuotas + " cuotas\nCon un precio por cuota de $" + precioCuota);
//                     condicionalCompra = false;
//                     break;
//                 default:
//                     alert("Ingrese una opción válida");
//             }
//         } else if (continuarCompra == "2") {
//             condicionalCompra = true;
//         } else {
//             condicionalCompra = false;
//         }
//     }
// }

// function buscarPerfumePorNombre() {
//     const nombrePerfume = prompt("Ingrese el nombre del perfume que desea buscar:");

//     const encontrado = perfumes.some(perfume => perfume.nombre.toLowerCase() === nombrePerfume.toLowerCase());

//     if (encontrado) {
//         alert("El perfume '" + nombrePerfume + "' está disponible.");
//     } else {
//         alert("El perfume '" + nombrePerfume + "' no se encontró.");
//     }
// }

// function listarProductos(orden) {
//     const copiaPerfumes = [...perfumes]; // Crea una copia de la matriz de perfumes

//     copiaPerfumes.map(perfume => {
//         console.log(`${perfume.nombre} - ${perfume.marca} - Precio: $${perfume.precio}`);
//     });

//     if (orden === "min") {
//         copiaPerfumes.sort(a, b)
//         if (a.precio < b.precio) return -1;
//         if (a.precio > b.precio) return 1;
//         return 0;
//     } else if (orden === "max") {
//         copiaPerfumes.sort((a, b) => {
//             if (a.precio > b.precio) return -1;
//             if (a.precio < b.precio) return 1;
//             return 0;
//         });
//     }

//     console.log("Productos ordenados:");
//     copiaPerfumes.map(perfume => {
//         console.log(`${perfume.nombre} - ${perfume.marca} - Precio: $${perfume.precio}`);
//     });
// }

// let salida = false;

// function menuProgramaPrincipal() {
//     let texto = prompt("1- Ver productos\n2- Buscar perfume por nombre\n3- Ver lista de productos del menor/mayor precios\n4- Mostrar carrito\n0- SALIR");
//     while (texto != 0) {
//         switch (texto) {
//             case "1":
//                 comprarPerfume(perfumes);
//                 break;
//             case "2":
//                 buscarPerfumePorNombre();
//                 break;
//             case "3":
//                 const orden = prompt("Seleccione el orden que desea:\n1- Minimo a maximo\n2- Maximo a minimo");
//                 if (orden === "1") {
//                     listarProductos("min");
//                 } else if (orden === "2") {
//                     listarProductos("max");
//                 } else {
//                     alert("Ingrese una opcion valida.");
//                 }
//                 break;
//             case "4":
//                 carrito.mostrarCarrito();
//                 break;
//             case "0":
//                 break;
//             default:
//                 alert("Ingrese una opcion valida.");
//         }

//         texto = prompt("1 - Ver productos\n2 - Buscar perfume por nombre\n3 - Ver lista de productos del menor/mayor precios\n4 - Mostrar carrito\n0 - para salir");
//     }
// }