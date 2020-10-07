// Ejemplo 1

function addSquares(a,b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}
a = addSquares(2,3); // retorna 13
b = addSquares(3,4); // retorna 25
c = addSquares(4,5); // retorna 41

console.log(a);
console.log(b);
console.log(c);

// Ejemplo 2
console.log('\n\n');

function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
fn_inside = outside(3); // Pensar en esto como: dar una funcion que suma 3 a lo que sea que des
result = fn_inside(5); // retorna 8

result1 = outside(3)(5); // retorna 8

console.log(fn_inside);
console.log(result);
console.log(result1);