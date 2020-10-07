
# 01_ Declaración y uso de variables

## Conceptos básicos

JavaScript está influenciado sobre todo por la sintaxis de Java, C y C++, pero también ha sido influenciado por Awk, Perl y Python.

JavaScript distingue entre mayúsculas y minúsculas (es **case-sensitive**) y utiliza el conjunto de caracteres Unicode. Por ejemplo, la palabra «Nombre»  se podría usar como el nombre de una variable.

```javascript
let Nombre = "Pepe"
```

Pero la variable `nombre` no es la misma que `Nombre` porque Javascript distingue entre mayúsculas y minúsculas.

En JavaScript, las instrucciones se denominan declaraciones y están separadas por punto y coma (;).

No es necesario un punto y coma después de una declaración si está escrita en su propia línea. Pero si se deseas más de una declaración en una línea, entonces debes separarlas con punto y coma.

Sin embargo, se considera una buena práctica escribir siempre un punto y coma después de una declaración, incluso cuando no sea estrictamente necesario. Esta práctica reduce las posibilidades de que se introduzcan errores en el código.

## Comentarios

La sintaxis de los comentarios es la misma que en C++ y en muchos otros lenguajes:

```javascript
// un comentario de una línea
 
/* este es un comentario 
 * más largo, de varias líneas
 */
 
/* Sin embargo, no puedes /* anidar comentarios */ SyntaxError */
```
Los comentarios se comportan como espacios en blanco y se descartan durante la ejecución del script.

## Declaraciones

JavaScript tiene tres tipos de declaraciones de variables.

- `var`: Declara una variable, opcionalmente la inicia a un valor.
- `let`: Declara una variable local con ámbito de bloque, opcionalmente la inicia a un valor.
- `const`: Declara un nombre de constante de solo lectura y ámbito de bloque.

### Variables

Los nombres de las variables, llamados identificadores, se ajustan a ciertas reglas.

Un identificador de JavaScript debe comenzar con una letra, un guión bajo (`_`) o un signo de dólar (`$`). Los siguientes caracteres también pueden ser dígitos (`0-9`).

Dado que JavaScript distingue entre mayúsculas y minúsculas, las letras incluyen los caracteres "`A`" a "`Z`" (mayúsculas), así como "`a`" a "`z`" (minúsculas).


Algunos ejemplos de nombres legales son `Number_hits`, `temp99`, `$credit` y `_name`.

### Declaración de variables

Puedes declarar una variable de dos formas:

- Con la palabra clave `var`. Por ejemplo, `var x = 42`. Esta sintaxis se puede utilizar para declarar variables locales y globales, dependiendo del contexto de ejecución.
- Con la palabra clave `const` o `let`. Por ejemplo, `let y = 13`. Esta sintaxis se puede utilizar para declarar una variable local con ámbito de bloque. 

> Se recomienda utilizar la segunda sintaxis siempre que sea posible, ya que el uso de `var` en diferentes ámbitos puede producir resultados inesperados. Si quieres más información puedes leer: [https://www.analyticslane.com/2019/06/10/diferencias-entre-var-y-let-en-javascript/](https://www.analyticslane.com/2019/06/10/diferencias-entre-var-y-let-en-javascript/)

### Evaluar variables

Una variable declarada usando la instrucción `var` o `let` sin un valor asignado especificado tiene el valor de undefined.

Un intento de acceder a una variable no declarada da como resultado el disparo de una excepción `ReferenceError`:


```javascript
var a;
console.log('El valor de a es ' + a); 
// El valor de a es undefined

console.log('El valor de b es ' + b); 
// El valor de b es undefined
var b;
// Esto puede desconcertarte hasta que leas 'Elevación de variable' a continuación

console.log('El valor de c es ' + c); 
// Error de referencia no detectado: c no está definida

let x;
console.log('El valor de x es ' + x); 
// El valor de x es undefined

console.log('El valor de y es ' + y); 
// Error de referencia no detectada: y no está definida
let y;
```

Puedes usar `undefined` para determinar si una variable tiene un valor. En el siguiente código, a la variable `input` no se le asigna un valor y la declaración `if` evalúa a `true`.

```javascript
var input;
if (input === undefined) {
  doThis();
} else {
  doThat();
}
```

> `null` y `undefined` pertenecen a los tipos primitivos de JavaScript son muy parecidos e incluso cuando inicias en el mundo de js, no te queda claro que diferencia hay entre ambos.
> 
> `Undefined`, es el valor que tiene una variable a la cual no se le ha asignado ningún valor. Es la forma en que JS dice que no sabe que es esa variable.
> 
> `Null`, significa que la variable no tiene ningún valor.
> 
> Como ves son bastante parecidos, pero la diferencia principal, es que Undefined, es asignado por JS y solo por JS de forma automática como valor inicial en caso de que no le asignes un valor. En cambio el valor Null, debe ser asignado explícitamente.
> 
> * El valor `undefined` se comporta como false cuando se usa en un contexto booleano.
> * El valor `undefined` se convierte en NaN cuando se usa en contexto numérico.
> Cuando evalúas una variable `null`, el valor nulo se comporta como `0` en contextos numéricos y como `false` en contextos booleanos


> JavaScript tiene comparaciones estrictas y de conversión de tipos. Una comparación estricta (por ejemplo, `===)` solo es verdadera si los operandos son del mismo tipo y los contenidos coinciden. La comparación abstracta más comúnmente utilizada (por ejemplo, `==)` convierte los operandos al mismo tipo antes de hacer la comparación.
> 
> Características de las comparaciones:
> - Dos cadenas son estrictamente iguales cuando tienen la misma secuencia de caracteres, la misma longitud y los mismos caracteres en las posiciones correspondientes.
> - Dos números son estrictamente iguales cuando son numéricamente iguales (tienen el mismo valor numérico). NaN no es igual a nada, incluido NaN. Los ceros positivos y negativos son iguales entre sí. 
> - Dos operandos booleanos son estrictamente iguales si ambos son true o ambos son false.
> - Dos objetos distintos nunca son iguales para comparaciones estrictas o abstractas.
> - Una expresión que compara objetos solo es verdadera si los operandos hacen referencia al mismo objeto.
> - Los tipos Null y Undefined son estrictamente iguales a ellos mismos y abstractivamente iguales entre sí.
>
> Más info en [https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Comparison_Operators](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Comparison_Operators)

### Ámbito de variables

Cuando declaras una variable fuera de cualquier función, se denomina variable global, porque está disponible para cualquier otro código en el documento actual. Cuando declaras una variable dentro de una función, se llama variable local, porque solo está disponible dentro de esa función.

JavaScript anterior a ECMAScript 2015 no tiene el ámbito de la declaración de bloque. Más bien, una variable declarada dentro de un bloque es local a la función (o ámbito global) en el que reside el bloque.

Por ejemplo, el siguiente código registrará 5, porque el ámbito de x es el contexto global (o el contexto de la función si el código es parte de una función). El ámbito de x no se limita al bloque de instrucciones if inmediato.

```javascript
if (true) {
  var x = 5;
}
console.log(x);  // x es 5
```

Este comportamiento cambia cuando se usa la declaración `let` (introducida en ECMAScript 2015).

```javascript
if (true) {
  let y = 5;
}
console.log(y); 
// ReferenceError: y no está definida
```

### Constantes

Puedes crear una constante de solo lectura con nombre con la palabra clave `const`.

La sintaxis de un identificador de constante es la misma que la de cualquier identificador de variable: debe comenzar con una letra, un subrayado o un signo de dólar (`$`) y puede contener caracteres alfabéticos, numéricos o de subrayado.

```javascript
const PI = 3.14;
```

Una constante no puede cambiar el valor a través de la asignación o volver a declararla mientras se ejecuta el script. Se debe iniciar a un valor.

Las reglas de ámbito para las constantes son las mismas que las de ámbito de bloque de las variables `let`. Si se omite la palabra clave `const`, se asume que el identificador representa una variable.

No puedes declarar una constante con el mismo nombre que una función o una variable en el mismo ámbito. Por ejemplo:

```javascript
// ESTO CAUSARÁ UN ERROR
function f() {};
const f = 5;

// ESTO TAMBIÉN CAUSARÁ UN ERROR
function f() {
  const g = 5;
  var g;

  // expresiones
}
```

Sin embargo, las propiedades de los objetos asignados a constantes no son protegidas, es por esto que la siguiente declaración se ejecuta sin problemas.

```javascript
const MY_OBJECT = {'key': 'value'};
MY_OBJECT.key = 'otherValue';
```

Además, el contenido de los arrays tampoco está protegido cuando es asignado a una constante, es por esto que la siguiente declaración se ejecuta sin problemas.

```javascript
const MY_ARRAY = ['HTML','CSS'];
MY_ARRAY.push('JAVASCRIPT');
console.log(MY_ARRAY); 
// muestra ['HTML','CSS','JAVASCRIPT'];
```

## Bibliografía

- [https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_Types)



