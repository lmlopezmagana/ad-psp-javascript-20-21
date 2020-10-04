
/**
    Map
 */

const miMapa = new Map();

// A diferencia de un Object, un Map puede tener claves de diferentes tipos, como objetos o funciones, y no sólo cadenas.
const claveObj = {},
      claveFunc = function() {},
      claveCadena = "una cadena";


// asignando valores
miMapa.set(claveCadena, "valor asociado con 'una cadena'");
miMapa.set(claveObj, "valor asociado con claveObj");
miMapa.set(claveFunc, "valor asociado with claveFunc");

console.log(miMapa.size); // 3

// Iterar con forEach
miMapa.forEach((value,key) => console.log(`Clave: ${key}, valor: ${value}`));
console.log("\n");


// Iterar con for..of
for (let clave of miMapa.keys()) {
    console.log(`Clave: ${clave}, valor: ${miMapa.get(clave)}`);
}
console.log("\n");

for (let [clave, valor] of miMapa.entries()) {
    console.log(`Clave: ${clave}, valor: ${valor}`);    
}
console.log("\n");

// Sólo valores
for (let valor of miMapa.values()) {
    console.log(valor);
}
console.log("\n");

// Podemos transformar en array y recorrer con forEach
[...miMapa.values()].forEach(e => console.log(e));


// obteniendo los valores
miMapa.get(claveCadena);    // "valor asociado con 'una cadena'"
miMapa.get(claveObj);       // "valor asociado con claveObj"
miMapa.get(claveFunc);      // "valor asociado con claveFunc"

miMapa.get("una cadena");   // ""valor asociado con 'una cadena'"
                         // porque claveCadena === 'una cadena'
miMapa.get({});           // undefined, porque claveObj !== {}
miMapa.get(function() {}) // undefined, porque claveFunc !== function () {}

console.log("\n\n\n");
/**
    Set
 */

// Creación y tamaño
let miSet = new Set(["uno", "dos", "tres"]);
console.log(miSet.size); 
console.log("\n");

// Añadir elementos
miSet.add("cuatro");

// Iterar con forEach
miSet.forEach(e => console.log(e));
console.log("\n");

// Borrar un elemento
miSet.delete("uno");
miSet.forEach(e => console.log(e));
console.log("\n");

// Iterar con for..of
for (const elem of miSet) {
    console.log(elem);
}
console.log("\n");

if (miSet.has("tres"))
    console.log("El tres está dentro del Set");
console.log("\n");

// Filtrar, mapear: OBLIGADA TRANSFORMACIÓN A ARRAY

Array.from(miSet)
    .filter(e => e.endsWith("s"))
    .map(e => e.toUpperCase())
    .forEach(e => console.log(e));
    


// Limpiar
console.log("\n");
miSet.clear();
console.log(miSet.size);