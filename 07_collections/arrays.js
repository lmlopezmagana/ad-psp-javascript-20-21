
/**
    CREACIÓN E INICIALIZACIÓN
 */

// Creación de un array


let miArray1 = new Array(); 
let miArray2 = new Array(6); // Array con 6 posiciones vacías
let miArray3 = new Array("Luismi", "López", 38); // Array con valores iniciales
let miArray3bis = ["Luismi", "López", 38]; // Otra forma


// Insertando valores en el array
const diaSemana = new Array(7);

diaSemana[0] = "lunes";
diaSemana[1] = "martes";
diaSemana[2] = "miércoles";
diaSemana[3] = "jueves";
diaSemana[4] = "viernes";
diaSemana[5] = "sábado";
diaSemana[6] = "domingo";


// Seguro que esta forma nos gusta más
let diaSemanaBis = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];


/**
    RECORRER UN ARRAY
 */

// Bucle for clásico

for (let i = 0; i < diaSemana.length; i++) {
    console.log(diaSemana[i]);
}
console.log("\n");

// forEach con arraw function
diaSemana.forEach(element => {
    console.log(element);
});
console.log("\n");


/**
    ALGUNOS MÉTODOS DE ARRAY
 */

let frutas = ["manzana", "pera"];
frutas.push("uva");
frutas.forEach(element => {
    console.log(element);
});
console.log("\n");

frutas.pop();
frutas.forEach(element => {
    console.log(element);
});
console.log("\n");

frutas.shift();
frutas.forEach(element => {
    console.log(element);
});
console.log("\n");

frutas.unshift("fresa");
frutas.forEach(element => {
    console.log(element);
});
console.log("\n");

console.log(frutas.indexOf("pera"));
console.log("\n");


frutas.splice(1,1);
frutas.forEach(element => {
    console.log(element);
});
console.log("\n");


frutas
    .map(element => element.toUpperCase())
    .forEach(element => {
        console.log(element);
    });
console.log("\n");
