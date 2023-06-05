function calcular(dato1, dato2) {
    let total = dato1 / dato2
    return total
}

let texto = prompt("Bienvenido, ingrese los datos solicitados:\n(si la compra en efectivo es mayor a 30000 obtendra un descuento de 20% de descuento)\n 1- Si desea pagar con efectivo. \n 2- Si desea pagar con credito/debito. \n 0- SALIR");

while (texto !== "0") {
    switch (texto) {
        case "1":
            let num1 = parseInt(prompt("Ingresar valor de monto a pagar: "));
            if (num1 > 30000) {
                let descuento = num1 * 0.2;
                let montoDescuentoFinal = num1 - descuento;
                alert("Gracias por su compra! \n El monto final es: $ " + montoDescuentoFinal);
            } else {
                alert("Gracias por su compra! \n El monto final es: $ " + num1);
            }
            break;
        case "2":
            let num2 = parseInt(prompt("Ingresar valor de monto: "));
            let num3 = parseInt(prompt("Ingresar cantidad de cuotas: "));
            let montoTotal = calcular(num2, num3)
            console.log(montoTotal)
            if (num3 <= 0){
                alert("El numero minimo de cuotas es 1")
            } else
            alert ("Gracias por su compra! \n El valor a pagar en " + num3 + " cuotas es de $ " + montoTotal + "." )
            break;

            default:
            alert("Ingrese una opción válida.");
    }
    texto = prompt("Bienvenido, ingrese los datos solicitados:\n(si la compra en efectivo es mayor a 30000 obtendra un descuento de 20% de descuento)\n 1- Si desea pagar con efectivo. \n 2- Si desea pagar con credito/debito. \n 0- SALIR");
}

