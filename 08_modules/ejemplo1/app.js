
import { suma, PI, Punto } from './libs/maths.js';

console.log(PI);
console.log(suma(1,2));

let a = new Punto(3,2);
let b = new Punto(-3,-3);
let distancia = a.distancia(b);
console.log(`La distancia entre a y b es ${distancia.toFixed(2)}`);