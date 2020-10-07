# Funciones

Las funciones son uno de los pilares fundamentales en JavaScript. Una función es un procedimiento en JavaScript—un conjunto de sentencias que realizan una tarea o calculan un valor. Para usar una función, debe definirla en algún lugar del ámbito desde el cual desea llamarla.

## Definición de funciones

La definición de una función (también llamada declaración de función o sentencia de función) consiste de la palabra clave (reservada)  `function`, seguida por:

- El nombre de la función (opcional).
- Una lista de argumentos para la función, encerrados entre paréntesis y separados por comas (,).
- Las sentencias JavaScript que definen la función, encerradas por llaves, `{ }`.
  
Por ejemplo, el siguiente código define una función simple llamada square:

```javascript
function square(number) {
  return number * number;
}
```

La función `square` toma un argumento, llamado `number`. La función consiste de una sentencia que expresa el retorno del argumento de la función (el cual es, `number`) multiplicado por sí mismo. La sentencia return especifica el valor retornado por la función.

```javascript
return number * number;
```

Los parámetros primitivos (como puede ser un número) son pasados a las funciones por valor; el valor es pasado a la función, si la función cambia el valor del parámetro, este cambio no es reflejado globalmente o en otra llamada a la función.

Si pasa un objeto (p. ej. un valor no primitivo, como un Array o un objeto definido por el usuario) como parámetro, y la función cambia las propiedades del objeto, este cambio sí es visible desde afuera de la función (a esto se le conoce como paso por referencia) como se ve en el siguiente ejemplo:

```javascript
function myFunc(theObject) {
  theObject.make = 'Toyota';
}

var mycar = {make: 'Honda', model: 'Accord', year: 1998};
var x, y;

x = mycar.make;     // x toma el valor "Honda"

myFunc(mycar);
y = mycar.make;     // y toma el valor "Toyota"
                    // (la propiedad make fue cambida por la funcion)
```

### Expresiones de función

Si bien la declaración de la función anterior es sintácticamente una sentencia, las funciones pueden también ser creadas por una expresión de función. Tal función puede ser anónima; no debe tener un nombre. Por ejemplo, la función square podría haber sido definida como:

```javascript
var square = function(number) {return number * number};
var x = square(4) //x obtiene el valor 16
```

Sin embargo, se puede proporcionar un nombre a una expresión de función, y éste puede ser utilizado dentro de la función para referirse a sí misma, o en un depurador para identificar la función en el trazado de pila:

```javascript
var factorial = function fac(n) {return n<2 ? 1 : n*fac(n-1)};
console.log(factorial(3));
```

**Las expresiones de función son convenientes cuando se pasa una función como argumento a otra función**. El siguiente ejemplo muestra una función map siendo definida y luego llamada con una expresión de función como primer parámetro:

```javascript
function map(f,a) {
  var result = [], // Crea un nuevo Array
      i;
  for (i = 0; i != a.length; i++)
    result[i] = f(a[i]);
  return result;
}
```

El siguiente código:

```javascript
var factorial = function fac(n) {return n<2 ? 1 : n*fac(n-1)};
console.log(factorial(3));

var multiplicar= function(x) { return x * x * x;} //Expresión de funcion

function map(f, arr) {
    return arr.map(f);
}

console.log(map(multiplicar, [0, 1, 2, 5, 10]));

```
retorna `[0, 1, 8, 125, 1000]`.

Además de definir funciones como se describe aquí, se puede utilizar el constructor `Function` para crear funciones desde una cadena en tiempo de ejecución, muy al estilo de `eval()`.

Un método, es una función que es propiedad de un objeto. Hablaremos de ellos cuando trabajemos con objetos.

## Llamando a funciones

Definir una función no la ejecuta. Definir una función simplemente la nombra y especifica que hacer cuando la función es llamada. Llamar la función es lo que realmente realiza las acciones especificadas con los parámetros indicados. Por ejemplo, si define la función  square, podría llamarla como sigue:

```javascript
square(5);
```

La sentencia anterior llama a la función con el argumento 5. La función ejecuta sus sentencias y retorna el valor 25.

Las funciones deben de estar dentro del ámbito cuando son llamadas, pero la declaración de la función puede ser izada (aparecer por debajo de la llamada en el codigo), como muestra el siguiente ejemplo:

```javascript
console.log(square(5));
/* ... */
function square(n) { return n*n } 
```

**El ámbito de la función es la función en la que es declarada o el programa entero si ésta es declarada en el nivel superior.**

```javascript
console.log(square); // square es creado con un valor inicial indefinido
console.log(square(5)); //TypeError: square no es un funcion
square = function (n) {
  return n * n;
} 
```

> Las funciones pueden recibir como argumentos, además de números y cadenas de caracteres, a objetos, así como otras funciones.

Una función puede ser recursiva; es decir, que puede llamarse a sí misma. Por ejemplo, a continuación tenemos una función que calcula el factorial de forma recursiva:

```javascript
function factorial(n){
  if ((n == 0) || (n == 1))
    return 1;
  else
    return (n * factorial(n - 1));
}
```

Hay otras formas de llamar a las funciones. A menudo hay casos en donde una función necesita ser llamada de forma dinámica, o en donde el número de argumentos de la misma varía; o en la cual, el contexto de la llamada de la función necesita ser ajustada para un objeto específico determinado en el tiempo de ejecución. Resulta que las funciones en sí mismas son objetos, y estos objetos a su vez tienen métodos. Uno de éstos, el método apply(), se puede utilizar para lograr este objetivo.

## Ámbito de una función

Las variables definidas dentro de una función no pueden ser accedidas desde ningún lugar fuera de la función, ya que la variable está definida sólo en el ámbito de la función. Sin embargo, una función puede acceder a todas las variables y funciones definidas dentro del ámbito en el cual está definida. En otras palabras, una función definida en el ámbito global puede acceder a todas las variables definidas en el ámbito global. Una función definida dentro de otra función, también puede acceder a todas las variables definidas en su función padre y a cualquier otra variable a la que la función padre tenga acceso.

```javascript
// Las siguientes variables están  definidas en el ámbito global
var num1 = 20,
    num2 = 3,
    nombre = "Messi";

// Esta función se define en el ámbito global
function multiplicar() {
  return num1 * num2;
}

multiplicar(); // Retorna 60

// Un ejemplo de función anidada
function obtenerPuntaje () {
  var num1 = 2,
      num2 = 3;
  
  function agregar() {
    return nombre + " puntaje " + (num1 + num2);
  }
  
  return agregar();
}

obtenerPuntaje(); // Retorna "Messi puntaje 5"
```

### Funciones anidadas y cierres

Se puede anidar una función dentro de una función. La función anidada (interna) es privada a su función contenedora (externa). También forma un cierre. Un cierre, es una expresión (típicamente una función) que puede tener variables libres junto con un entorno que ata esas variables (que "cierra" la expresión).

Dado que una función anidada es un cierre, esto significa que una función anidada puede "heredar" los argumentos y variables de su función contenedora. En otras palabras, la función interna contiene el ámbito de la función externa.

En resumen:

- La función interna sólo se puede acceder a partir de sentencias dentro de la función externa.
- La función interna forma un cierre: la función interna puede utilizar los argumentos y variables de la función externa, mientras que la función externa no puede utilizar los argumentos y las variables de la función interna.
  
El siguiente ejemplo muestra funciones anidadas:

```javascript
function addSquares(a,b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}
a = addSquares(2,3); // retorna 13
b = addSquares(3,4); // retorna 25
c = addSquares(4,5); // retorna 41
```

Dado que la función interna forma un cierre, se puede llamar a la función externa y especificar argumentos para ambas, tanto para la función externa como para la interna:

```javascript
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
fn_inside = outside(3); // Pensar en esto como: dar una funcion que suma 3 a lo que sea que des
result = fn_inside(5); // retorna 8

result1 = outside(3)(5); // retorna 8
```

### Conflictos de nombres

Cuando dos argumentos o variables en los ámbitos de un cierre tienen el mismo nombre, ocurre un *conflicto de nombre*. Los ámbitos más internos toman precedencia, asi que el ambito más interno de todos toma la precedencia más alta, mientras que el ámbito más externo toma la más baja. Esta es la cadena de ámbito. El primero en la cadena es el ámbito más interno de todos, y el último, es el ámbito más externo. Considere lo siguiente:


```javascript
function outside() {
  var x = 10;
  function inside(x) {
    return x;
  }
  return inside;
}
result = outside()(20); // retorna 20 en lugar de 10
```

El conflicto de nombres sucede en la sentencia `return x` y es entre el parámetro `x` de `inside` y la variable `x` de `outside`. Aquí la cadena de ámbito es `{inside, outside, objeto global}`. Por lo tanto, `x` de `inside` toma precedencia sobre `x` de `outside`, y `20` (la `x` de `inside`) se devuelve en lugar de `10` (la `x` de `outside`).

## Clausuaras (o cierres)

Aunque ya hemos hablado de ellos, podemos profundizar un poco más. Las clausuras (informalmente llamadas cierres) son una de las características más poderosas de JavaScript. JavaScript permite debido al anidamiento de funciones y concesiones a la función interna, el acceso total a todas las variables y funciones definidas dentro de la función externa (y a todas las variables y funciones a las cuales la función externa tiene acceso). Sin embargo, la función externa no tiene acceso a las variables y funciones definidas dentro de la función interna. Esto provee una especie de seguridad a las variables de la función interna. Además, ya que la función interna tiene acceso al ámbito de la función externa, las variables y funciones definidas en la función externa vivirán más tiempo que la función externa en sí misma si la función interna las administra para sobrevivir más allá del ciclo de vida de la función externa. Una clausura es creada cuando la función interna es, de alguna manera, hecha disponible a cualquier  ámbito fuera de la función externa.

```javascript
var pet = function(name) {          // La funcion externa define una variable llamada "name"
      var getName = function() {
        return name;                // La funcion interna tiene aceso a la variable "name" de la funcion externa
      }

      return getName;               // Devolver la funcion interna, por lo tanto exponiendola a un ambito exterior
    },
    myPet = pet("Vivie");           // Devuelve "Vivie"
    
myPet();  
```

Esto puede ser mucho más complejo que el código anterior. Puede ser retornado un objeto que contiene métodos para manipular las variables internas de la función externa.



```javascript
var createPet = function(name) {
  var sex;
  
  return {
    setName: function(newName) {
      name = newName;
    },
    
    getName: function() {
      return name;
    },
    
    getSex: function() {
      return sex;
    },
    
    setSex: function(newSex) {
      if(typeof newSex == "string" && (newSex.toLowerCase() == "male" || newSex.toLowerCase() == "female")) {
        sex = newSex;
      }
    }
  }
}

var pet = createPet("Vivie");
pet.getName();                  // Vivie

pet.setName("Oliver");
pet.setSex("male");
pet.getSex();                   // male
pet.getName();                  // Oliver
```

En el código anterior, la variable `name` de la función externa es accesible desde las funciones internas, y no hay otra forma de acceder a las variables internas excepto a través de las funciones internas. Las variables internas de las funciones internas actúan como almacenamientos seguros para las variables y argumentos externos. Mantienen "persistente" y segura, la información con la que necesitan trabajar las funciones internas. Las funciones no tienen por que ser asignadas a una variable, o tener un nombre.

> En mi opinión, aquellos programadores que vienen de un lenguaje POO aprovecharán las características de OO que incluye la versión 6 de ECMAScript, y no tanto el uso de clausuaras.

## Parámetros de función

A partir de ECMAScript 6, hay dos nuevos tipos de parámetros: Parámetros por defecto y  los parámetros REST.

### Parámetro por defecto

En JavaScript, los parámetros de funciones están establecidos por defecto a `undefined`. Sin embargo, en ciertas situaciones puede ser útil establecerlos a un valor suministrado por defecto diferente.  Es entonces cuando los parámetros por defecto pueden ayudar.

En el pasado, la estrategia general para establecer los parámetros por defecto era comprobar los valores de éstos en el cuerpo de la función y asignar un valor si estos eran `undefined`. Si en el siguiente ejemplo ningún valor es suministrado para `b` durante el llamado, su valor sería `undefined` cuando se evalúe `a*b`; y la llamda de  `multiply`  retornaría `NaN`. Sin embargo, esto se evita con la segunda línea en este ejemplo:

```javascript
function multiply(a, b) {
  b = typeof b !== 'undefined' ?  b : 1;
  
  return a*b;
}

multiply(5); // 5
```

Con los parámetros por defecto, la comprobación en el cuerpo de la función ya no es necesaria. Ahora, puede simplemente poner 1 como valor por defecto para b en la cabeza de la función.

```javascript
function multiply(a, b = 1) {
  return a*b;
}

multiply(5); // 5
```

> Puedes encontrar más información y algunos ejemplos [aquí](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Parametros_por_defecto).

### Parámetros rest

La sintaxis de parámetros rest (en inglés) nos permite representar un número indefinido de argumentos en forma de array. En el ejemplo, usamos los parámetros rest para recolectar los argumentos a partir del segundo y hasta el final. Entonces los multiplicamos por el primero. Este ejemplo está usando una función flecha, la cual es introducida en la siguiente sección.

```javascript
function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]
```

## Funciones flecha

Una expresión de función flecha tiene una sintaxis más compacta que una expresión de función regular, por lo que son una buena alternativa a estas últimas, aunque no tienen su propio `this`, `arguments`, `super` o `new.target`. Estas expresiones no son adecuadas para ser utilizadas como métodos, y no pueden ser usadas como constructores. **Las funciones flecha son siempre funciones anónimas**.

### Funciones más cortas

En algunos patrones funcionales, las funciones más cortas son bienvenidas. Compare:

```javascript
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryl­lium"
];

var a2 = a.map(function(s){ return s.length });

var a3 = a.map( s => s.length );
```

> ¿No te recuerdan a las expresiones lambda?

### Sin `this` propio

Hasta antes de las funciones flecha, cada nueva función definía su propio valor `this` . Esto probó ser molesto en un estilo de programación orientada a objetos.

```javascript
function Person() {
  // El constructor Person() define `this` como el mismo.
  this.age = 0;

  setInterval(function growUp() {
    // En modo no estricto, la funcion growUp() define `this` 
    // como el objeto global, el cual es diferente de el `this`
    // definido por el constructor Person().
    this.age++;
  }, 1000);
}

var p = new Person();
```

En ECMAScript 3/5, esto fue solucionado asignado el valor contenido por this a  una variable sobre la que se podía cerrar (o clausurar).

```javascript
function Person() {
  var self = this; // Algunos eligen `that` en lugar de `self`. 
                   // Elija uno y sea consistente.
  self.age = 0;

  setInterval(function growUp() {
    // La retrollamada se refiere a la variable `self` de la cual
    // el valor es el objeto esperado.
    self.age++;
  }, 1000);
}
```

Las funciones flecha capturan el valor de this del contexto circundante, por lo que el siguiente código funciona como se espera.

```javascript
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| se refiere apropiadamente al objeto instancia de Person.
  }, 1000);
}

var p = new Person();
```

## Funciones predefinidas

- `eval`
- `isFinite`
- `isNaN`
- `parseInt` y `parseFloat`
- `Number` y `String`
- `encodeURI`, `decodeURI`, `encodeURIComponent`, y `decodeURIComponent`

> Puedes encontrar más información sobre ellas [aquí](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Funciones#eval_function)

