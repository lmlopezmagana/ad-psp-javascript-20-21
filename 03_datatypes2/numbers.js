
/**
    OPERACIONES CON NÚMEROS
 */

const PRECIO = 25;
let cantidad = 3;
const DESCUENTO = 10; // 10%

let resultado = PRECIO * cantidad * ((100 - DESCUENTO) / 100);

let mensaje = `Si el precio es ${PRECIO}, la cantidad de artículos es ${cantidad} y el descuento es del ${DESCUENTO} %, el precio final es de ${resultado} euros`;

console.log(mensaje);


console.log(Math.PI);
console.log(Math.PI.toExponential());
console.log(Math.PI.toFixed());
console.log(Math.PI.toPrecision());
console.log(Math.PI.toString());

let noEsUnNumero = 3 / 0;
console.log(Number.isNaN(noEsUnNumero)); // false, es un número; infinito, pero un número
console.log(Number.isFinite()); // false, porque es infinito.

console.log(Number.isNaN(0 / 0)); // true

