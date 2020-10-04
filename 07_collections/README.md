
# Colecciones e iteradores

## Colecciones indexadas

### El objeto **`Array`**

Un array es una lista ordenada de valores a los que te refieres con un nombre y un índice.

Por ejemplo, considera un array llamado `emp`, que contiene los nombres de los empleados indexados por su id de empleado numérico. De tal modo que `emp[0]` sería el empleado número cero, `emp[1]` el empleado número uno, y así sucesivamente.

JavaScript no tiene un tipo de dato `array` explícito. Sin embargo, puedes utilizar el objeto `Array` predefinido y sus métodos para trabajar con arrays en tus aplicaciones. El objeto `Array` tiene métodos para manipular arrays de varias formas, tal como unirlos, invertirlos y ordenarlos. Tiene una propiedad para determinar la longitud del array y otras propiedades para usar con expresiones regulares.

### Crear un array

Las siguientes declaraciones crean arrays equivalentes:

```javascript
let arr = new Array(element0, element1, ..., elementN)
let arr = Array(element0, element1, ..., elementN)
let arr = [element0, element1, ..., elementN]
```

`element0, element1, ..., elementN` es una lista de valores para los elementos del array. Cuando se especifican estos valores, el array se inicia con ellos como elementos del array. La propiedad `length` del array se establece en el número de argumentos.

La sintaxis de corchetes se denomina "array literal" o "iniciador de array". Es más corto que otras formas de creación de arrays, por lo que generalmente se prefiere. 

Para crear un array con una longitud distinta de cero, pero sin ningún elemento, se puede utilizar cualquiera de las siguientes:

```javascript
// Esta...
let arr = new Array(arrayLength)

// ...da como resultado el mismo array que este
let arr = Array(arrayLength)


// Esto tiene exactamente el mismo efecto
let arr = []
arr.length = arrayLength
```

Además de una variable recién definida como se muestra arriba, los arrays también se pueden asignar como una propiedad a un objeto nuevo o existente:

```javascript
let obj = {}
// ...
obj.prop = [element0, element1, ..., elementN]

// O
let obj = {prop: [element0, element1, ...., elementN]}
```

Si deseas iniciar un array con un solo elemento, y el elemento resulta ser un `Número`, debes usar la sintaxis de corchetes. Cuando se pasa un solo valor `Number` al constructor o función `Array()`, se interpreta como un `arrayLength`, no como un solo elemento.

```javascript
let arr = [42]       // Crea un array con un solo elemento:
                     // el número 42.

let arr = Array(42)  // Crea un array sin elementos
                     // y arr.length establecidos en 42. 
                     //
                     // Esto es equivalente a:
let arr = []
arr.length = 42
```

En ES2015, puedes utilizar el método estático `Array.of` para crear arrays con un solo elemento.

### Referencia a elementos de un array

Se puede utilizar el operador corchete `[]`.

Supongamos el siguiente array:

```javascript
let myArray = ['Wind', 'Rain', 'Fire']
```

Puedes referirte al primer elemento del array como `myArray[0]`, al segundo elemento del array como `myArray[1]`, etc… El índice de los elementos comienza en cero.

### Llenar un array

Puedes llenar un array asignando valores a sus elementos. Por ejemplo:

```javascript
let emp = []
emp[0] = 'Casey Jones'
emp[1] = 'Phil Lesh'
emp[2] = 'August West'
```

Si proporcionas un valor no entero al operador `array` en el código anterior, se creará una propiedad en el objeto que representa al array, en lugar de un elemento del array.

```javascript
let arr = []
arr[3.4] = 'Oranges'
console.log(arr.length)                 // 0
console.log(arr.hasOwnProperty(3.4))    // true
```

También puedes rellenar un array cuando lo creas:

```javascript
let myArray = new Array('Hello', myVar, 3.14159)
// o
let myArray = ['Mango', 'Apple', 'Orange']
```

Más adelante, en los métodos de un array, veremos alguno con el que podemos añadir elementos.

### Iterando sobre arrays

Una operación común es iterar sobre los valores de un array, procesando cada uno de alguna manera. La forma más sencilla de hacerlo es la siguiente:

```javascript
let colors = ['red', 'green', 'blue']
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i])
}
```

Si sabes que ninguno de los elementos de tu array se evalúa como `false` en un contexto booleano, puedes usar un lenguaje eficiente:

```javascript
let divs = document.getElementsByTagName('div')
for (let i = 0, div; div = divs[i]; i++) {
  /* Procesar div de alguna manera */
}
```

Esto evita la sobrecarga de verificar la longitud del array y garantiza que la variable `div` se reasigne al elemento actual cada vez que se realiza el bucle para mayor comodidad.

El método `forEach()` proporciona otra forma de iterar sobre un array:

```javascript
let colors = ['red', 'green', 'blue']
colors.forEach(function(color) {
  console.log(color)
})
// red
// green
// blue
```

Alternativamente, puedes acortar el código para el parámetro forEach con las funciones de flecha ES2015:

```javascript
let colors = ['red', 'green', 'blue']
colors.forEach(color => console.log(color))
// red
// green
// blue
```
La función pasada a `forEach` se ejecuta una vez por cada elemento del array, con el elemento de array pasado como argumento de la función. Los valores no asignados no se iteran en un bucle `forEach`.

Ten en cuenta que los elementos de un array que se omiten cuando se define el array no se enumeran cuando lo itera `forEach`, pero hay que tener cuidado con `undefined`. Mira el siguiente ejemplo:

```javascript
let array = ['first', 'second', , 'fourth']

array.forEach(function(element) {
  console.log(element)
})
// first
// second
// fourth

if (array[2] === undefined) { 
  console.log('array[2] is undefined')  // true
} 

array = ['first', 'second', undefined, 'fourth']

array.forEach(function(element) {
  console.log(element)
})
// first
// second
// undefined
// fourth
```

Dado que los elementos de JavaScript se guardan como propiedades de objeto estándar, no es recomendable iterar a través de arrays de JavaScript usando bucles `for...in`, porque se enumerarán los elementos normales y todas las propiedades enumerables.

### Métodos de un array

- `concat()`: une dos o más arrays
```javascript
let myArray = new Array('1', '2', '3')
myArray = myArray.concat('a', 'b', 'c')
// myArray is now ["1", "2", "3", "a", "b", "c"]
```
- `join(delimiter = ',')` une los elementos de un array en una cadena
```javascript
let myArray = new Array('Viento', 'Lluvia', 'Fuego')
let list = myArray.join('-')   // la lista es "Viento - Lluvia - Fuego"
```
- `push()`: agrega uno o más elementos al final del array y devuelve la longitud resultante.
```javascript
let myArray = new Array('1', '2')
myArray.push('3') // myArray ahora es ["1", "2", "3"]
```
- `pop()`: elimina el último elemento del array y devuelve ese elemento.
```javascript
let myArray = new Array ('1', '2', '3')
let last = myArray.pop()
// myArray ahora es ["1", "2"], last = "3"
```
- `shift` elimina el primer elemento del array y devuelve ese elemento
```javascript
let myArray = new Array ('1', '2', '3')
let first = myArray.shift()
// myArray ahora es ["2", "3"], first es "1"
```
- `unshift` agrega uno o más elementos al principio del array y devuelve la nueva longitud
```javascript
let myArray = new Array('1', '2', '3')
myArray.unshift('4', '5')
// myArray se convierte en ["4", "5", "1", "2", "3"]
```
- `slice(start_index, upto_index)` extrae una sección del array y devuelve un nuevo array
```javascript
let myArray = new Array('a', 'b', 'c', 'd', 'e')
myArray = myArray.slice(1, 4) // comienza en el índice 1 y extrae todos los elementos
                               // hasta el índice 3, devuelve ["b", "c", "d"]
```
- `splice(index, count_to_remove, addElement1, addElement2, ...)` elimina elementos de un array y (opcionalmente) los reemplaza. Devuelve los elementos eliminados.
```javascript
let myArray = new Array('1', '2', '3', '4', '5')
myArray.splice(1, 3, 'a', 'b', 'c', 'd')
// myArray ahora es ["1", "a", "b", "c", "d", "5"]
// Este código comenzó en el índice uno (o donde estaba el "2"),
// eliminó 3 elementos allí, y luego insertó todos los consecutivos
// elementos en su lugar.
```
- `reverse()` invierte el orden de los elementos de un array. Devuelve una referencia a dicho array.
```javascript
let myArray = new Array ('1', '2', '3')
myArray.reverse()
// transpone el array para que myArray = ["3", "2", "1"]
```
- `sort()` ordena los elementos del array y devuelve una referencia al mismo. También puede recibir una función _callback_ que indique cómo ordenar
```javascript
let myArray = new Array('Viento', 'Lluvia', 'Fuego')
myArray.sort()
// ordena el array para que myArray = ["Fuego", "Lluvia", "Viento"]
```

Aquí, por ejemplo, se ordenará por la última letra de la cadena:
```javascript
let sortFn = function(a, b) {
  if (a[a.length - 1] < b[b.length - 1]) return -1;
  if (a[a.length - 1] > b[b.length - 1]) return 1;
  if (a[a.length - 1] == b[b.length - 1]) return 0;
}
myArray.sort(sortFn)
// ordena el array para que myArray = ["Viento", "Fuego", "Lluvia"]
```
- `indexOf(searchElement[, fromIndex]` busca en el array el elemento `searchElement` y devuelve la posición de la primera coincidencia
```javascript
let a = ['a', 'b', 'a', 'b', 'a']
console.log(a.indexOf('b')) // registros 1

// Ahora inténtalo de nuevo, comenzando después de la última coincidencia
console.log(a.indexOf('b', 2)) // registra 3
console.log(a.indexOf('z')) // logs -1, porque no se encontró 'z'
```
- `lastIndexOf(...)` funciona como la anterior, pero buscando desde el final del array
```javascript
let​ a = ['a', 'b', 'c', 'd', 'a', 'b']
console.log(a.lastIndexOf('b')) // registra 5

// Ahora inténtalo de nuevo, comenzando desde antes de la última coincidencia
console.log(a.lastIndexOf('b', 4)) // registra 1
console.log(a.lastIndexOf('z'))    // registra -1
```
- `forEach(callback[, thisObject])` ejecuta _callback_ en cada elemento del array y devuelve `undefined`.
```javascript
let​a = ['a', 'b', 'c']
a.forEach(function(elemento) { console.log(elemento) })
// imprime por consola cada elemento por turno
```
- `map(callback[, thisObject])` devuelve un nuevo array que resulta de aplicar _callback_ a cada elemento del array
```javascript
let a1 = ['a', 'b', 'c']
let a2 = a1.map(function(item) { return item.toUpperCase() })
console.log(a2) // registra ['A', 'B', 'C']
```
- `filter(callback[, thisObject])` devuelve un nuevo array que contiene los elementos para los que _callback_ devolvió `true`.
```javascript
let a1 = ['a', 10, 'b', 20, 'c', 30]
let a2 = a1.filter(function(item) { return typeof item === 'number'; })
console.log(a2)  // registra [10, 20, 30]
```
- `every(callback [, thisObject])` devuelve `true` si _callback_ devuelve `true` para cada elemento del array
```javascript
function isNumber(value) {
  return typeof value === 'number' 
}
let a1 = [1, 2, 3]
console.log(a1.every(isNumber))  // registra true
let a2 = [1, '2', 3] 
console.log(a2.every(isNumber))  // registra false
```
- `some(callback [, thisObject])` devuelve `true` si _callback_ devuelve `true` para algún elemento del array
```javascript
function isNumber(value) {
  return typeof value === 'number'
}
let a1 = [1, 2, 3]
console.log(a1.some(isNumber))  // registra true
let a2 = [1, '2', 3]
console.log(a2.some(isNumber))  // registra true
let a3 = ['1', '2', '3']
console.log(a3.some(isNumber))  // registra false
```

### Arrays tipados

Se tratan de objetos similares a los arrays y proporcionan un mecanismo para acceder a los datos binarios sin procesar. 

Puedes encontrar más información en [https://developer.mozilla.org/es/docs/Web/JavaScript/Vectores_tipados](https://developer.mozilla.org/es/docs/Web/JavaScript/Vectores_tipados).


## Colecciones basadas en clave

### Mapas

ECMAScript 2015 introduce una nueva estructura de datos para asociar claves con valores. Un objeto `Map` es un mapa de clave/valor simple y puedes iterar sobre sus elementos en el orden en que fueron insertados.

El siguiente código muestra algunas operaciones básicas con un `Map`. Consulta también la página de referencia de `Map` para obtener más ejemplos y la API completa. Puedes usar un bucle `for...of` para devolver un array de `[key, value]` para cada iteración.

```javascript
let sayings = new Map();
sayings.set('dog', 'woof');
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
sayings.size; // 3
sayings.get('dog'); // woof
sayings.get('fox'); // undefined
sayings.has('bird'); // false
sayings.delete('dog');
sayings.has('dog'); // false

for (let [key, value] of sayings) {
  console.log(key + ' goes ' + value);
}
// "cat goes meow"
// "elephant goes toot"

sayings.clear();
sayings.size; // 0 
```

> Tienes toda la información sobre Map pulsando [aquí](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map)

#### Diferencias entre un objeto y `map`

Tradicionalmente, los objetos de Javascript se han utilizado para asignar cadenas a valores. Los objetos `Map` tienen algunas ventajas sobre ellos:

- En un objeto, las claves son cadenas o literales. En un `map`, puede ser cualquier valor.
- Puedes obtener el `size` de un `Map` fácilmente, mientras que tienes que realizar un seguimiento manual del tamaño de un `Object`.
- Cuando se itera sobre un mapa, nos devuelve los elementos en orden de inserción.

**¿Cuándo usar `Object` y cuando `Map`?**

- Usa mapas sobre objetos cuando las claves sean desconocidas hasta el momento de la ejecución, y cuando todas las claves sean del mismo tipo y todos los valores sean del mismo tipo.
- Utiliza mapas si es necesario almacenar valores primitivos como claves porque el objeto trata cada clave como una cadena, ya sea un valor numérico, un valor booleano o cualquier otro valor primitivo.
- Usa objetos cuando haya lógica que opere en elementos individuales.

> Un tipo de especial de mapa es [WeakMap](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/WeakMap); es una colección de pares clave/valor en la que **las claves solo son objetos** y los valores pueden ser valores arbitrarios. Las referencias de objeto en las claves se mantienen *débilmente*, lo que significa que son un objetivo de recolección de basura (GC por Garbage Collection) si ya no hay otra referencia al objeto. La API de `WeakMap` es la misma que la API de `Map`.

### Conjuntos (`Sets`)

Los objetos `Set` son colecciones de valores. Puedes iterar sus elementos en el orden en que se insertaron. Un valor en un `Set` solo puede aparecer una vez; es único en la colección del `Set`.

El siguiente código muestra algunas operaciones básicas con un `Set`:

```javascript
let mySet = new Set();
mySet.add(1);
mySet.add('algún texto');
mySet.add('foo');

mySet.has(1); // true
mySet.delete('foo');
mySet.size; // 2

for (let item of mySet) console.log(item);
// 1
// "algún texto"
```

> Más información sobre `Set` pulsando [aquí](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Set)

#### Conversión entre arrays y `Set`

Puedes crear un `Array` a partir de un `Set` usando `Array.from` o el operador de propagación. Además, el constructor de `Set` acepta un `Array`, construyendolo a partir de los elementos del mismo.

> El operador de propagación _spread operator_ permite que una expresión sea expandida en situaciones donde se esperan múltiples argumentos (llamadas a funciones) o múltiples elementos (arrays literales).
> ```javascript
> f(...iterableObj); // Llamadas a funciones
> [...iterableObj, 4, 5, 6] // Arrays literales
> [a, b, ...iterableObj] = [1, 2, 3, 4, 5]; // Desestructuración (destructuring)
>

```javascript
Array.from(mySet);
[...mySet2];

mySet2 = new Set([1, 2, 3, 4]);
```

#### Comparación entre `Array` y `Set`

Tradicionalmente en muchas situaciones, un conjunto de elementos se ha almacenado en arrays de JavaScript. Sin embargo, el nuevo objeto `Set` tiene algunas ventajas:

- Eliminar elementos de un Array por valor (`arr.splice(arr.indexOf(val), 1)`) es muy lento.
- Los objetos `Set` te permiten eliminar elementos por su valor. Con un array, tendrías que empalmar (con `splice`) en función del índice de un elemento.
- El valor `NaN` no se puede encontrar con `indexOf` en un array.
- Los objetos `Set` almacenan valores únicos. No es necesario que realices un seguimiento manual de los duplicados.

> Análogamente a los objetos `Map`, también existe el objeto [`WeakSet`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/WeakSet).




