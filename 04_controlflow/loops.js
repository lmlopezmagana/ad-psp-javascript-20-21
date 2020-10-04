
// Bucle for

for (let i = 0; i < 10; i++) {
  console.log(i);
}

console.log('\n\n\n');

// do...while

let i = 0;
do {
  i += 1;
  console.log(i);
} while (i < 5);


console.log('\n\n\n');


// while

let n = 0;
let x = 0;
while (n < 3) {
  n++;
  x += n;
}

console.log('\n\n\n');


// for..in

const frutas = ['Peras', 'Manzanas', 'Fresas', 'Papayas', 'Mangos'];
for (const fruta in frutas) {
    console.log(fruta);
    //console.log(frutas[fruta])
}

console.log('\n\n\n');


// for...of

let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (let i of arr) {
   console.log(i); // logs "3", "5", "7"
}