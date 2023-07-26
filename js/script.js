
getProduct()
async function getProduct() {
    const productosjson = await fetch("./js/productos.JSON")
    const perfumes = await productosjson.json()
    return Promise.all(perfumes)
}



// funciones para decorar 
const bienvenida = document.getElementById('bienvenidaId');
function ocultarElemento() {
    bienvenida.style.display = 'none'
}
setTimeout(ocultarElemento, 7000);


let carritoA = []
let contenedorPerfumes = document.getElementById("contenedor");
let carritoJSON = JSON.parse(localStorage.getItem("carritoA"));

if (carritoJSON) {
    carritoA = carritoJSON;
    renderizarCarrito();
}

async function renderizar() {
    const productosjson = await fetch("./js/productos.JSON")
    const perfumes = await productosjson.json()
    contenedorPerfumes.innerHTML = ""
    perfumes.forEach(perfume => {
        let mensaje = "Unidades: " + perfume.stock
        if (perfume.stock < 10) {
            mensaje = "Ultimas unidades disponibles"
        }
        let tarjetaPerfume = document.createElement("div")
        tarjetaPerfume.clasname = "tarjetaPerfume"
        tarjetaPerfume.innerHTML = `
    <h2 class= "fuenteH2">   ${perfume.nombre}  </h2>  
    <img class="imagen" src="./imagenes/${perfume.rutaImagen}" alt="">
    <p class= "textoInfo"> ${mensaje} <br> Tamaño: ${perfume.tamanio} ML </p>
    <p class= "textoInfo textoInfoPrecio">$ ${perfume.precio}
    <button id=${perfume.id} class="textoInfoBoton">Agregar al carrito</button>`

        contenedorPerfumes.appendChild(tarjetaPerfume);
        let botonAgregarAlCarrito = document.getElementById(perfume.id)
        botonAgregarAlCarrito.addEventListener("click", agregarAlCarrito)

    })
}

async function renderizarConFiltro(perfumesConFiltro) {
    contenedorPerfumes.innerHTML = ""
    perfumesConFiltro.forEach(perfume => {
        let mensaje = "Unidades: " + perfume.stock
        if (perfume.stock < 10) {
            mensaje = "Ultimas unidades disponibles"
        }
        let tarjetaPerfume = document.createElement("div")
        tarjetaPerfume.clasname = "tarjetaPerfume"
        tarjetaPerfume.innerHTML = `
    <h2 class= "fuenteH2">   ${perfume.nombre}  </h2>  
    <img class="imagen" src="./imagenes/${perfume.rutaImagen}" alt="">
    <p class= "textoInfo"> ${mensaje} <br> Tamaño: ${perfume.tamanio} ML </p>
    <p class= "textoInfo textoInfoPrecio">$ ${perfume.precio}
    <button id=${perfume.id} class="textoInfoBoton">Agregar al carrito</button>`

        contenedorPerfumes.appendChild(tarjetaPerfume);
        let botonAgregarAlCarrito = document.getElementById(perfume.id)
        botonAgregarAlCarrito.addEventListener("click", agregarAlCarrito)

    })
}

async function agregarAlCarrito(e) {

    const productosjson = await fetch("./js/productos.JSON")
    const perfumes = await productosjson.json()

    let perfumeBuscado = perfumes.find(perfume => perfume.id == e.target.id);

    if (perfumeBuscado.stock > 0) {
        carritoA.push(perfumeBuscado);
        guardarCarritoEnLocalStorage();
        renderizarCarrito();
        perfumeBuscado.stock--;
        renderizar();
        Toastify({
            text: "Se ha agregado al carrito correctamente",
            duration: 3000
        }).showToast();
    } else {
        Swal.fire({
            title: 'No disponible',
            text: 'Lo sentimos, este producto no esta disponible en stock.',
            icon: 'error'
        });
    }
}
async function reiniciarStock() {
    const productosjson = await fetch("./js/productos.JSON")
    const perfumes = await productosjson.json()
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
    let i = 0
    carritoFisico.innerHTML = "";
    carritoA.forEach(perfume => {
        carritoFisico.innerHTML += `
      <div class="col">
        <div class="card">
          <div class="row">
            <p>${perfume.nombre} - $ ${perfume.precio} - ${perfume.tamanio} ml</p>
            <div><img class="cartImg" src="./imagenes/${perfume.rutaImagen}" alt=""></div>
            <button class="botonesQuitar " id="quitar${i}">Eliminar</button>
          </div>
        </div>
      </div>
    `;
        i++
    });

    quitarFuncion();
    actualizarCarritoEnLocalStorage();
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

input.addEventListener("input", () => filtrarYRenderizar(input.value));

// filtrar y renderizar 

async function filtrarYRenderizar(valorFiltro) {
    const productosjson = await fetch("./js/productos.JSON")
    const perfumes = await productosjson.json()
    let perfumesFiltrados = perfumes.filter(perfume => perfume.nombre.toLowerCase().includes(valorFiltro))
    renderizarConFiltro(perfumesFiltrados)
}
// filtrar y renderizar 
async function filtrarYRenderizarPorCategoriaGenero(e) {
    const productosjson = await fetch("./js/productos.JSON")
    const perfumes = await productosjson.json()
    let perfumesFiltrados = perfumes.filter(perfume => perfume.genero === e.target.value)
    renderizarConFiltro(perfumesFiltrados)
}

async function filtrarYRenderizarPorCategoriaTipo(e) {
    const productosjson = await fetch("./js/productos.JSON")
    const perfumes = await productosjson.json()
    let perfumesFiltrados = perfumes.filter(perfume => perfume.tipo === e.target.value)
    renderizarConFiltro(perfumesFiltrados)
}

let botonesFiltroTipo = document.getElementsByClassName("filtroTipo") //tipo de fragancia
let botonesFiltros = document.getElementsByClassName("filtroGenero") //genero
for (const botonFiltro of botonesFiltros) {
    botonFiltro.addEventListener("click", filtrarYRenderizarPorCategoriaGenero)
}
for (const botonFiltro of botonesFiltroTipo) {
    botonFiltro.addEventListener("click", filtrarYRenderizarPorCategoriaTipo)
}
// funcion actualizar
function actualizarCarritoEnLocalStorage() {
    localStorage.setItem('carritoA', JSON.stringify(carritoA));
}


function quitarDelCarrito(id) {
    const index = carritoA.findIndex((item) => item.id === id);
    if (index !== -1) {
        carritoA.splice(index, 1);
        actualizarCarritoEnLocalStorage();
        renderizarCarrito();
    }
}
// funcion quitar un producto del carrito//
function quitarFuncion() {
    let i = 0;
    carritoA.forEach((element) => {
        let idBtnQuitar = 'quitar' + i;
        const btnQuitar = document.getElementById(idBtnQuitar);
        btnQuitar.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Eliminar producto',
                text: '¿Esta seguro de eliminar el producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si',
                cancelButtonText: 'no'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        quitarDelCarrito(element.id);
                        Swal.fire('Borrado', 'El producto ha sido eliminado', 'success')
                    }
                })
        });
        i++;
    });
}


let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarOcultar)
let botonVolverAProductos = document.getElementById("volverAProductos")
botonVolverAProductos.addEventListener("click", mostrarOcultar)
let botonFiltroGenero1 = document.getElementById("filtroGenero1")
let botonFiltroGenero2 = document.getElementById("filtroGenero2")
let botonFiltroTipo1 = document.getElementById("filtroTipo1")
let botonFiltroTipo2 = document.getElementById("filtroTipo2")
let fraganciasP = document.getElementById("fraganciasP")
let Capa_1 = document.getElementById("Capa_1")

function mostrarOcultar() {
    let padreContenedor = document.getElementById("productos")
    let carrito1 = document.getElementById("carrito")
    botonPagar.classList.toggle("oculto")
    padreContenedor.classList.toggle("oculto")
    carrito1.classList.toggle("oculto")
    botonVolverAProductos.classList.toggle("oculto")
    botonCarrito.classList.toggle("oculto")
    botonFiltroGenero1.classList.toggle("oculto")
    botonFiltroGenero2.classList.toggle("oculto")
    botonFiltroTipo1.classList.toggle("oculto")
    botonFiltroTipo2.classList.toggle("oculto")
    fraganciasP.classList.toggle("oculto")
    Capa_1.classList.toggle("oculto")

}

renderizar()

// getProduct()
// class Perfume {
//     constructor(nombre, marca, tamanio, genero, tipo, precio, id, stock, rutaImagen) {
//         this.nombre = nombre;
//         this.marca = marca;
//         this.tamanio = tamanio;
//         this.genero = genero;
//         this.tipo = tipo;
//         this.precio = precio;
//         this.id = id;
//         this.stock = stock
//         this.rutaImagen = rutaImagen;
//     }

//     agregarItem() {
//         carrito.agregarPerfume(this);
//     }
// }

// const perfumes = [
//     new Perfume('Boss Bottled', 'HUGO BOSS', '50', 'masculino', 'Parfum', '43300', '1', '18', "bossbottled.jpg"),
//     new Perfume('Boss Alive', 'HUGO BOSS', '50', 'femenino', 'Parfum', '44000', '2', '25', "bossalive1.jpg"),
//     new Perfume('Boss Alive', 'HUGO BOSS', '80', 'femenino', 'Parfum', '57000', '3', '11', "bossalive2.jpg"),
//     new Perfume('ACQUA DI GIO HOMME ', 'ARMANI', '100', 'masculino', 'Toilette', '48900', '4', '21', "acqua1.jpeg"),
//     new Perfume('ACQUA DI GIO HOMME ABSOLU', 'ARMANI', '200', 'masculino', 'Parfum', '64000', '5', '13', "acquaabsolu.jpg"),
//     new Perfume('One Million', 'Paco Rabanne', '100', 'masculino', 'Toilette', '47700', '6', '11', "onemillion1.jpg"),
//     new Perfume('One Million', 'Paco Rabanne', '200', 'masculino', 'Toilette', '69200', '7', '8', "onemillion2.jpg"),
//     new Perfume('Invictus', 'Paco Rabanne', '50', 'masculino', 'Toilette', '40500', '8', '16', "invictus.jpg"),
//     new Perfume('Invictus', 'Paco Rabanne', '100', 'masculino', 'Toilette', '47500', '9', '10', "invictus1.jpg"),
//     new Perfume('Bad Boy', 'Carolina Herrera', '50', 'masculino', 'Parfum', '44900', '10', '18', "badboy.jpg"),
//     new Perfume('Eros', 'Versace', '200', 'masculino', 'Toilette', '68400', '11', '12', "eros.jpg")
// ];