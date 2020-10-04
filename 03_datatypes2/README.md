
# Tipos de datos (II)

## Números

En JavaScript, los números se implementan en [Formato en coma flotante de doble precisión](https://es.wikipedia.org/wiki/Formato%20en%20coma%20flotante%20de%20doble%20precisi%C3%B3n) de 64 bits IEEE 754 (es decir, un número entre ±2<sup>−1022</sup> y ±2<sup>+1023</sup>, o aproximadamente ±10<sup>−308</sup> a ±10<sup>+308</sup>, con una precisión numérica de 53 bits). Los valores enteros hasta ±2<sup>53 - 1</sup> se pueden representar con exactitud.

Además de poder representar números de punto flotante, el tipo `number` tiene tres valores simbólicos: `+Infinity`, `-Infinity` y `NaN` (_Not-a-Number_, no es un número).

Una adición más reciente a JavaScript es el `BigInt` que te permite representar números enteros que pueden ser muy grandes. Sin embargo, existen advertencias para usar `BigInt`; por ejemplo, no puedes mezclar y hacer coincidir los valores `BigInt` y `Number` en la misma operación, y no puedes usar el objeto `Math` con valores `BigInt`.

Puedes utilizar cuatro tipos de literales numéricos: decimal, binario, octal y hexadecimal (vistos en la lección anterior).

### Operaciones

Se pueden realizar las habituales operaciones matemáticas o de comparación.

### El objeto `Number`


El objeto integrado `Number` tiene propiedades para constantes numéricas, como valor máximo, `NaN` (no un número) e `infinity`. No puedes cambiar los valores de estas propiedades y las debes usar de la siguiente manera:

```javascript
let biggestNum = Number.MAX_VALUE;
let smallestNum = Number.MIN_VALUE;
let infiniteNum = Number.POSITIVE_INFINITY;
let negInfiniteNum = Number.NEGATIVE_INFINITY;
let notANum = Number.NaN;
```

#### Métodos de `Number`

| Método | Descripción
|--------|-------------
| `Number.parseFloat()`	| Analiza un argumento de cadena y devuelve un número de punto flotante.<br/> Igual que la función `parseFloat()` global.
| `Number.parseInt()` |	Analiza un argumento de cadena y devuelve un número entero de la base o raíz especificada.<br/>Igual que la función `parseInt()` global.
| `Number.isFinite()` |	Determina si el valor pasado es un número finito.
| `Number.isInteger()` |	Determina si el valor pasado es un número entero.
| `Number.isNaN()`	| Determina si el valor pasado es NaN. Versión más robusta del `isNaN()` global original.


#### Métodos de objetos de tipo `Number`

| Método | Descripción
|--------|-------------
| `toExponential()` | Devuelve una cadena que representa el número en notación exponencial.
| `toFixed()` |	Devuelve una cadena que representa el número en notación de punto fijo.
| `toPrecision()` | Devuelve una cadena que representa el número con una precisión especificada en notación de punto fijo.
| `toString()` | Devuelve una cadena que representa al número
| `isNaN()` | Determina si el valor es un NaN.

#### Objeto `Math`

El objeto integrado `Math` tiene propiedades y métodos para constantes y funciones matemáticas. Por ejemplo, la propiedad `PI` del objeto `Math` tiene el valor de `pi` (3.141...)


Más información en [https://www.w3schools.com/jsref/jsref_obj_math.asp](https://www.w3schools.com/jsref/jsref_obj_math.asp)


## Cadenas de caracteres

Las cadenas o `String` de JavaScript se utilizan para representar datos de texto. Es un conjunto de "elementos" de valores enteros de 16-bit no signados. Cada elemento en la cadena ocupa una posición en ella. El primer elemento se encuentra en el índice 0, el siguiente en el índice 1, y asi subsecuentemente. La longitud de una cadena es el número de elementos en ella. Es posible crear cadenas utilizando literales de cadena u objetos de cadena.

### Operaciones con cadenas de caracteres

* Concatenar: se puede realizar con el operador `+`
```javascript
let msg = 'Hola ' + 'Mundo';
```

### Métodos de `String`

| Método | Descripción
|--------|-------------
| `charAt`, `charCodeAt`, `codePointAt` | Devuelve el caracter o el código del caracter en la posición especificada en la cadena.
| `indexOf`, `lastIndexOf` | Devuelve la posición de la subcadena en la cadena o la última posición de una subcadena especificada respectivamente.
| `startsWith`, `endsWith`, `includes` | Devuelve si la cadena empieza, termina o contiene una cadena especificada, o no.
| `concat` | Combina el texto de dos cadenas y retorna una nueva cadena.
| `fromCharCode`, `fromCodePoint`	| Construye una cadena desde la secuencia de valores Unicode especificada. Este es un método de la clase `String`, no una instancia de `String`.
| `split` | Divide un objeto `String` en un array de strings separados por substrings.
| `slice` | Extrae una sección de un string y devuelve un nuevo string.
| `substring`, `substr`	| Devuelve un substring del string, bien especificando el comienzo y el final, o bien el índice inicial y la longitud del substring.
| `match`, `replace`, `search` | Para trabajar con expresiones regulares
| `toLowerCase`, `toUpperCase` | Devuelve el string en mayúsculas o en minúsculas
| `normalize` | Devuelve es string Normalizado en Unicode.
| `repeat`	| Devuelve un string formado por los elementos del objetos repetidos el número de veces que le indiquemos.
| `trim` | Elimina los espacios en blanco del principio y del final del string.





