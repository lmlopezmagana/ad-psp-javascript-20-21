
# Estructuras y tipos de datos

- [Estructuras y tipos de datos](#estructuras-y-tipos-de-datos)
  - [Tipos de datos](#tipos-de-datos)
  - [Tipado dinámico](#tipado-dinámico)
    - [Números y el operador `+`](#números-y-el-operador-)
    - [Convertir texto a números](#convertir-texto-a-números)
  - [Literales](#literales)
    - [Arrays literales](#arrays-literales)
      - [Comas adicionales al declarar un array](#comas-adicionales-al-declarar-un-array)
    - [Booleanos litearales](#booleanos-litearales)
    - [Literales numéricos](#literales-numéricos)
    - [Literales en coma flotante](#literales-en-coma-flotante)
    - [Objetos literales](#objetos-literales)
      - [Objetos literales mejorados](#objetos-literales-mejorados)
    - [Cadenas literales](#cadenas-literales)


## Tipos de datos

El último estándar ECMAScript define ocho tipos de datos:

* Siete tipos de datos que son primitivos:
  1. `Boolean`. `true` y `false`.
  2. `null`. Una palabra clave especial que denota un valor nulo. (Dado que JavaScript distingue entre mayúsculas y minúsculas, `null` no es lo mismo que `Null`, `NULL` o cualquier otra variante).
  3. `undefined`. Una propiedad de alto nivel cuyo valor no está definido.
  4. `Number`. Un número entero o un número con coma flotante. Por ejemplo: `42` o `3.14159`.
  5. `BigInt`. Un número entero con precisión arbitraria. Por ejemplo: `9007199254740992n`.
  6. `String`. Una secuencia de caracteres que representan un valor de texto. Por ejemplo: `"Hola"`
  7. `Symbol` (nuevo en ECMAScript 2015). Un tipo de dato cuyas instancias son únicas e inmutables.
* y `Object`

Aunque estos tipos de datos son una cantidad relativamente pequeña, permiten realizar funciones útiles con tus aplicaciones. Los otros elementos fundamentales en el lenguaje son los Objetos y las funciones. Puedes pensar en objetos como contenedores con nombre para los valores, y las funciones como procedimientos que puedes programar en tu aplicación.

> Presentaremos algunos de estos tipos con más detenimiento en lecciones posteriores.

## Tipado dinámico

JavaScript es un lenguaje tipado dinámicamente. Esto significa que no tienes que especificar el tipo de dato de una variable cuando la declaras. También significa que los tipos de datos se convierten automáticamente según sea necesario durante la ejecución del script.

Así, por ejemplo, puedes definir una variable de la siguiente manera:

```javascript
let answer = 42;
```

Y luego, puedes asignarle una cadena a esa misma variable, por ejemplo:

```javascript
answer = 'Gracias por todo el pescado...';
```

Debido a que JavaScript se tipifica dinámicamente, esta asignación no genera un mensaje de error.

> Con todo, este código anterior no sería una buena práctica :)

### Números y el operador `+`

En expresiones que involucran valores numéricos y de cadena con el operador `+`, JavaScript convierte los valores numéricos en cadenas. Por ejemplo, considera las siguientes declaraciones:

```javascript
x = 'La respuesta es ' + 42 
// "La respuesta es 42"
y = 42 + ' es la respuesta' 
// "42 es la respuesta"
```

Con todos los demás operadores, JavaScript no convierte valores numéricos en cadenas. Por ejemplo:

```javascript
'37' - 7 // 30
'37' + 7 // "377"
```

### Convertir texto a números

 En el caso que un valor representando un número está en memoria como texto, hay métodos para la conversión.

```javascript
parseInt()
parseFloat()
```

`parseInt` solo devuelve números enteros.

> Además, una práctica recomendada para parseInt es incluir siempre el parámetro radix. El parámetro `radix` se utiliza para especificar qué sistema numérico se utilizará.

```javascript
parseInt('101', 2) // 5, ya que se hace en binario
parseInt('101.5',10) // 101
console.log(parseFloat('101.5')); // 101.5
```

## Literales

Los literales representan valores en JavaScript. Estos son valores fijos, no variables, que literalmente proporcionas en tu script. Esta sección describe los siguientes tipos de literales:

* Arrays literales
* Booleanos literales
* Literales de coma flotante
* Literales numéricos
* Objetos literales
* Cadenas literales

### Arrays literales

Un array literal es una lista de cero o más expresiones, cada una de las cuales representa un elemento del array, encerrada entre corchetes ([]). Cuando creas un array utilizando un array literal, se inicia con los valores especificados como sus elementos, y su `length` se establece en el número de argumentos especificado.

El siguiente ejemplo crea el arrays `coffees` con tres elementos y `length` de tres:

```javascript
let coffees = ['French Roast', 'Colombian', 'Kona'];
```

> Un array literal es muy parecido a un objeto creado con un _iniciador de objeto_. Hablaremos de ello más adelante en el temario.

#### Comas adicionales al declarar un array

No tienes que especificar todos los elementos en un array literal. Si colocas dos comas en una fila, el array completa el valor `undefined` para los elementos no especificados. El siguiente ejemplo crea el array `fish`:

```javascript
let fish = ['Lion', , 'Angel'];
```

Este array tiene dos elementos con valores y un elemento vacío:

* `fish[0]` es `"Lion"`
* `fish[1]` es `undefined`
* `fish[2]` es `"Angel"`

Si incluyes una coma al final de la lista de los elementos, la coma es ignorada.

En el siguiente ejemplo, el `length` del array es tres. No hay `myList[3]`. Todas las demás comas de la lista indican un nuevo elemento.

> Las comas finales pueden crear errores en versiones anteriores del navegador y se recomienda eliminarlas.

```javascript
let myList = ['home', , 'school', ];
```

En el siguiente ejemplo, el `length` del array es cuatro, y faltan `myList[0]` y `myList[2]`.

```javascript
let myList = [ ,'home', , 'school'];
```

En el siguiente ejemplo, el `length` del array es cuatro, y faltan `myList[1]` y `myList[3]`. Solo se ignora la última coma.

```javascript
let myList = ['home', , 'school', , ];
```

Entender el comportamiento de las comas adicionales es importante para comprender JavaScript como lenguaje.

**Sin embargo, al escribir tu propio código, debes declarar explícitamente los elementos que faltan como undefined. Hacerlo así aumenta la claridad y la facilidad de mantenimiento de tu código.**

### Booleanos litearales

El tipo booleano tiene dos valores literales: `true` y `false`.

### Literales numéricos

Los tipos `Number` y `BigInt` se pueden escribir en decimal (base 10), hexadecimal (base 16), octal (base 8) y binario (base 2).

* Un literal numérico decimal es una secuencia de dígitos sin un 0 (cero) inicial.
* Un `0` (cero) inicial en un literal numérico, o un `0o` inicial (o `0O`) indica que está en octal. Los números octales pueden incluir solo los dígitos 0-7.
* Un `0x` inicial (o `0X`) indica un tipo numérico hexadecimal. Los números hexadecimales pueden incluir los dígitos (0-9) y las letras a-f y A-F. (Si un caracter está en mayúscula o minúscula no cambia su valor. Por lo tanto: `0xa` = `0xA` = `10` y `0xf` = `0xF` = 15).
* Un `0b` inicial (o `0B`) indica un literal numérico binario. Los números binarios solo pueden incluir los dígitos `0` y `1`.

Aquí tienes algunos ejemplos de literales numéricos:

```javascript
0, 117, -345, 123456789123456789n             
// (decimal, base 10)
015, 0001, -0o77, 0o777777777777n             
// (octal, base 8) 
0x1123, 0x00111, -0xF1A7, 0x123456789ABCDEFn  
// (hexadecimal, "hex" o base 16)
0b11, 0b0011, -0b11, 0b11101001010101010101n  
// (binario, base 2)
```

### Literales en coma flotante

Un literal de coma flotante puede tener las siguientes partes:

- Un entero decimal que puede tener un signo (precedido por "`+`" o "`-`"),
- Un punto decimal ("`.`"),
- Una fracción (otro número decimal),
- Un exponente.

La parte del exponente es una "`e`" o "`E`" seguida de un número entero, que puede tener signo (precedido por "`+`" o "`-`"). Un literal de coma flotante debe tener al menos un dígito y un punto decimal o "`e`" (o "`E`").

Específicamente, la sintaxis es:

```
[(+|-)][dígitos].[dígitos][(E|e)[(+|-)]dígitos]
```
Por ejemplo:

```javascript
3.1415926
-.123456789
-3.1E+12
.1e-23
```

### Objetos literales

Un objeto literal es una lista de cero o más pares de nombres de propiedad y valores asociados de un objeto, entre llaves (`{}`).

> **¡No uses un objeto literal al comienzo de una declaración!** Esto dará lugar a un error (o no se comportará como esperabas), porque la { se interpretará como el comienzo de un bloque.

El siguiente es un ejemplo de un objeto literal. El primer elemento del objeto `car` define una propiedad, `myCar`, y le asigna una nueva cadena, `"Saturn"`; al segundo elemento, la propiedad `getCar`, se le asigna inmediatamente el resultado de invocar a la función (`carTypes("Honda")`); el tercer elemento, la propiedad `special`, utiliza una variable (`sales`) existente.

```javascript
var sales = 'Toyota';

function carTypes(name) {
  if (name === 'Honda') {
    return name;
  } else {
    return "Lo sentimos, no vendemos " + name + ".";
  }
}

var car = { myCar: 'Saturn', getCar: carTypes('Honda'), special: sales };

console.log(car.myCar);   // Saturn
console.log(car.getCar);  // Honda
console.log(car.special); // Toyota 
```

Además, puedes utilizar un literal numérico o de cadena para el nombre de una propiedad o anidar un objeto dentro de otro. El siguiente ejemplo usa estas opciones.

```javascript
var car = { manyCars: {a: 'Saab', b: 'Jeep'}, 7: 'Mazda' };

console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda
```

Los nombres de propiedad de los objetos pueden ser cualquier cadena, incluida la cadena vacía. Si el nombre de la propiedad no fuera un identificador o un número JavaScript válido, debe ir entre comillas.

#### Objetos literales mejorados

En ES2015, los objeto literales se amplían para admitir la configuración del prototipo en la construcción, la abreviatura para asignaciones `foo: foo`, la definición de métodos, la realización de llamadas a `super` y el cálculo de nombres de propiedades con expresiones.

Juntos, estos también acercan los objetos literales y las declaraciones de clase, y permiten que el diseño basado en objetos se beneficie de algunas de las mismas conveniencias.

> Trabajaremos más adelante la Orientación a Objetos con Javascript.

### Cadenas literales

Una cadena literal consta de cero o más caracteres encerrados entre comillas dobles (`"`) o simples (`'`). Una cadena debe estar delimitada por comillas del mismo tipo (es decir, ambas comillas simples o, ambas comillas dobles).

Los siguientes son ejemplos de cadenas literales:

```javascript
'foo'
"bar"
'1234'
"una linea \n otra linea"
"John's cat"
```

Puedes llamar a cualquiera de los métodos del objeto `String` en un valor de cadena literal. JavaScript automáticamente convierte la cadena literal en un objeto `String` temporal, llama al método y luego descarta el objeto `String` temporal. También puedes usar la propiedad `String.length` con una cadena literal:

```javascript
// Imprimirá el número de símbolos en la cadena, incluidos los espacios en blanco. 
console.log("John's cat".length)  // En este caso, 10.
```

En ES2015, también están disponibles las plantillas literales. Las plantillas literales están encerradas por la comilla invertida (`` ` ``) (acento grave) en lugar de comillas simples o dobles.

Las cadenas de las plantillas literales proporcionan _sugar syntax_ para construir cadenas. (Esto es similar a las funciones de interpolación de cadenas en Perl o Python).

Opcionalmente, puedes agregar una etiqueta para permitirte personalizar la construcción de la cadena, evitando ataques de inyección o construyendo estructuras de datos de nivel superior a partir del contenido de la cadena.

```javascript
// Creación de cadenas literales básicas
`en JavaScript '\n' es un avance de línea.`

// Cadenas multilínea
`En JavaScript, las cadenas de plantilla pueden ocupar
 varias líneas, pero las cadenas entrecomillas dobles o
 simples no pueden.`

// Interpolación de cadenas
var name = 'Bob', time = 'today';
`Hola ${name}, ¿cómo estás ${time}?`

```

Debes usar cadenas literales a menos que específicamente necesites usar un objeto `String`. 


