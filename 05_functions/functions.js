
// Definición sencilla de una función

function square(number) {
  return number * number;
}

console.log(square(9));

// Función que recibe un objeto

function myFunc(theObject) {
  theObject.make = 'Toyota';
}

var mycar = {make: 'Honda', model: 'Accord', year: 1998};
var x, y;

x = mycar.make;     // x toma el valor "Honda"

myFunc(mycar);
y = mycar.make;     // y toma el valor "Toyota"
                    // (la propiedad make fue cambida por la funcion)

console.log(y);

// Expresión de función

var factorial = function fac(n) {return n<2 ? 1 : n*fac(n-1)};
console.log(factorial(3));

var multiplicar= function(x) { return x * x * x;} //Expresión de funcion

function map(f, arr) {
    return arr.map(f);
}

console.log(map(multiplicar, [0, 1, 2, 5, 10]));

// Se puede llamar a una función definida después de invocarla

console.log(cube(3))
function cube(n) {
    return n*n*n;
}


// Recursividad

function factorial(n){
  if ((n == 0) || (n == 1))
    return 1;
  else
    return (n * factorial(n - 1));
}

console.log(factorial(5));