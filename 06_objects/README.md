
# Objetos en Javascript

- [Objetos en Javascript](#objetos-en-javascript)
  - [Visión general](#visión-general)
  - [Objetos y propiedades](#objetos-y-propiedades)
  - [Creación de objetos nuevos](#creación-de-objetos-nuevos)
    - [Usando iniciadores de objeto](#usando-iniciadores-de-objeto)
    - [Usar una función constructora](#usar-una-función-constructora)
  - [Herencia](#herencia)
    - [Clases ES6](#clases-es6)
    - [Declaración de clases](#declaración-de-clases)
    - [Expresiones de clases](#expresiones-de-clases)
    - [Cuerpo de la clase y definición de métodos](#cuerpo-de-la-clase-y-definición-de-métodos)
      - [Modo estricto](#modo-estricto)
      - [Constructor](#constructor)
      - [Métodos prototipo](#métodos-prototipo)
      - [Métodos estáticos](#métodos-estáticos)
    - [Subclases con `extends`](#subclases-con-extends)
    - [Mix-ins](#mix-ins)
      - [Ejemplo de un mixin](#ejemplo-de-un-mixin)




JavaScript está diseñado en un paradigma simple basado en objetos. Un objeto es una colección de propiedades, y una propiedad es una asociación entre un nombre (o clave) y un valor. El valor de una propiedad puede ser una función, en cuyo caso la propiedad es conocida como un método. Además de los objetos que están predefinidos en el navegador o una librería, puedes definir tus propios objetos. Este capítulo describe cómo usar objetos, propiedades, funciones y métodos; y cómo crear tus propios objetos.

## Visión general

Los objetos en JavaScript, como en tantos otros lenguajes de programación, se pueden comparar con objetos de la vida real. El concepto de Objetos en JavaScript se puede entender con objetos tangibles de la vida real.

En JavaScript, un objeto es un entidad independiente con propiedades y tipos. Compáralo con una taza, por ejemplo. Una taza es un objeto con propiedades. Una taza tiene un color, un diseño, un peso, un material del que está hecha, etc. Del mismo modo, los objetos de JavaScript pueden tener propiedades que definan sus características.

## Objetos y propiedades

Un objeto de JavaScript tiene propiedades asociadas a él. Una propiedad de un objeto se puede explicar como una variable adjunta al objeto. Las propiedades de un objeto básicamente son lo mismo que las variables comunes de JavaScript, excepto por el nexo con el objeto. Las propiedades de un objeto definen las características del objeto. Accedes a las propiedades de un objeto con una simple notación de puntos:

```javascript
objectName.propertyName
```

Como todas las `variables` de JavaScript, tanto el nombre del objeto (que puede ser una variable normal) como el nombre de la propiedad son sensibles a mayúsculas y minúsculas. Puedes definir propiedades asignándoles un valor. Por ejemplo, vamos a crear un objeto llamado `myCar` y le vamos a asignar propiedades denominadas `make`, `model`, y `year` de la siguiente manera:

```javascript
var myCar = new Object();
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;
```

El ejemplo anterior también se podría escribir usando un **iniciador de objeto**, que es una lista delimitada por comas de cero o más pares de nombres de propiedad y valores asociados de un objeto, encerrados entre llaves (`{}`):

```javascript
var myCar = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969
};
```

> Las propiedades no asignadas de un objeto son `undefined` (y​ no `null`). 

También puedes acceder o establecer las propiedades de los objetos en JavaScript mediante la notación de corchetes (`[]`). Los objetos, a veces son llamados arrays asociativos, debido a que cada propiedad está asociada con un valor de cadena que se puede utilizar para acceder a ella. Por lo tanto, por ejemplo, puedes acceder a las propiedades del objeto `myCar` de la siguiente manera:

```javascript
myCar['make']  = 'Ford';
myCar['model'] = 'Mustang';
myCar['year']  = 1969;
```

El nombre de la propiedad de un objeto puede ser cualquier cadena válida de JavaScript, o cualquier cosa que se pueda convertir en una cadena, incluyendo una cadena vacía. Sin embargo, cualquier nombre de propiedad que no sea un identificador válido de JavaScript (por ejemplo, el nombre de alguna propiedad que tenga un espacio o un guión, o comience con un número) solo se puede acceder utilizando la notación de corchetes. Esta notación es muy útil también cuando los nombres de propiedades son determinados dinámicamente (cuando el nombre de la propiedad no se determina hasta el tiempo de ejecución). Ejemplos de esto se muestran a continuación:

```javascript
// Se crean y asignan cuatro variables de una sola vez,
// separadas por comas
var myObj = new Object(),
    str = 'myString',
    rand = Math.random(),
    obj = new Object();

myObj.type                 = 'Sintaxis de puntos';
myObj['fecha de creación'] = 'Cadena con espacios';
myObj[str]                 = 'Valor de cadena';
myObj[rand]                = 'Número aleatorio';
myObj[obj]                 = 'Object';
myObj['']                  = 'Incluso una cadena vacía';

console.log(myObj);
```

Por favor, ten en cuenta que todas las claves con notación en corchetes se convierten a cadenas a menos que estas sean símbolos, ya que los nombres de las propiedades (claves) en Javascript pueden solo pueden ser cadenas o símbolos. Por ejemplo, en el código anterior, cuando la clave `obj` se añadió a `myObj`, Javascript llamará al método `obj.toString()`, y usará la cadena resultante de esta llamada como la nueva clave.

También puedes acceder a las propiedades mediante el uso de un valor de cadena que se almacena en una variable:

```javascript
var propertyName = 'make';
myCar[propertyName] = 'Ford';

propertyName = 'model';
myCar[propertyName] = 'Mustang';
```

Puedes usar la notación de corchetes con `for...in` para iterar sobre todas las propiedades enumerables de un objeto. Para ilustrar cómo funciona esto, la siguiente función muestra las propiedades del objeto cuando pasas el objeto y el nombre del objeto como argumentos a la función:

```javascript
function showProps(obj, objName) {
  var result = ``;
  for (var i in obj) {
    // obj.hasOwnProperty() se usa para filtrar propiedades de la cadena de prototipos del objeto
    if (obj.hasOwnProperty(i)) {
      result += `${objName}.${i} = ${obj[i]}\n`;
    }
  }
  return result;
}
```

Por lo tanto, la llamada a la función `showProps(myCar, "myCar")` devolverá lo siguiente:

```javascript
myCar.make = Ford
myCar.model = Mustang
myCar.year = 1969
```

## Creación de objetos nuevos

JavaScript tiene una colección de objetos predefinidos. Además, puedes crear tus propios objetos. En JavaScript 1.2 y versiones posteriores, puedes crear un objeto usando un iniciador de objeto. Como alternativa, puedes crear primero una función constructora y luego crear una instancia de un objeto invocando esa función con el operador `new`.

### Usando iniciadores de objeto

Además de la creación de objetos utilizando una función constructora, puedes crear objetos utilizando un iniciador de objeto. El uso de iniciadores de objetos a veces se denomina crear objetos con notación literal. 

La sintaxis para un objeto usando un iniciador de objeto es:

```javascript
var obj = { property_1:   value_1,   // property_# puede ser un identificador...
            2:            value_2,   // o un número...
            // ...,
            'property n': value_n }; // o una cadena
```

donde `obj` es el nombre del nuevo objeto, cada `property_i` es un identificador (ya sea un nombre, un número o una cadena literal), y cada `value_i` es una expresión cuyo valor se asigna a la `property_i`. El `obj` y la asignación es opcional; si no necesitas hacer referencia a este objeto desde otro lugar, no necesitas asignarlo a una variable. (Ten en cuenta que tal vez necesites envolver el objeto literal entre paréntesis si el objeto aparece donde se espera una declaración, a fin de no confundir el literal con una declaración de bloque).

Los iniciadores de objetos son expresiones, y cada iniciador de objeto da como resultado un nuevo objeto donde la instrucción de creación sea ejecutada. Los iniciadores de objetos idénticos crean objetos distintos que no se compararán entre sí como iguales. Los objetos se crean como si se hiciera una llamada a `new Object()`; es decir, los objetos hechos a partir de expresiones literales de objeto son instancias de `Object`.

La siguiente declaración crea un objeto y lo asigna a la variable `x` si y solo si la expresión `cond` es `true`.

```javascript
if (cond) var x = {greeting: '¡Hola!'};
```

El siguiente ejemplo crea `myHonda` con tres propiedades. Observa que la propiedad `engine` también es un objeto con sus propias propiedades.

```javascript
var myHonda = {color: 'red', wheels: 4, engine: {cylinders: 4, size: 2.2}};
```

### Usar una función constructora

Como alternativa, puedes crear un objeto con estos dos pasos:

1. Definir el tipo de objeto escribiendo una función constructora. Existe una fuerte convención, con buena razón, para utilizar en mayúscula la letra inicial.
2. Crear una instancia del objeto con el operador `new`.

Para definir un tipo de objeto, crea una función para el objeto que especifique su nombre, propiedades y métodos. Por ejemplo, supongamos que deseas crear un tipo de objeto para coches. Quieres llamar `Car` a este tipo de objeto, y deseas que tenga las siguientes propiedades: `make`, `model` y `year`. Para ello, podrías escribir la siguiente función:

```javascript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
```

Observa el uso de `this` para asignar valores a las propiedades del objeto en función de los valores pasados a la función.

Ahora puedes crear un objeto llamado myCar de la siguiente manera:

```javascript
var mycar = new Car('Eagle', 'Talon TSi', 1993);
```

Esta declaración crea `myCar` y le asigna los valores especificados a sus propiedades. Entonces el valor de `myCar.make` es la cadena "Eagle", para `myCar.year` es el número entero 1993, y así sucesivamente.

Puedes crear cualquier número de objetos `Car` con las llamadas a `new`. Por ejemplo,

```javascript
var kenscar = new Car('Nissan', '300ZX', 1992);
var vpgscar = new Car('Mazda', 'Miata', 1990);
```

Un objeto puede tener una propiedad que en sí misma es otro objeto. Por ejemplo, supongamos que defines un objeto llamado `person` de la siguiente manera:

```javascript
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}
```

y luego instancias dos nuevos objetos `person` de la siguiente manera:

```javascript
var rand = new Person('Rand McKinnon', 33, 'M');
var ken = new Person('Ken Jones', 39, 'M');
```

Entonces, puedes volver a escribir la definición de `Car` para incluir una propiedad `owner` que tomará el objeto `person`, de la siguiente manera:

```javascript
function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}
```

Para crear instancias de los nuevos objetos, utiliza lo siguiente:

```javascript
var car1 = new Car('Eagle', 'Talon TSi', 1993, rand);
var car2 = new Car('Nissan', '300ZX', 1992, ken);
```

Nota que en lugar de pasar un valor de cadena o entero cuando se crean los nuevos objetos, las declaraciones anteriores pasan al objetos `rand` y `ken` como argumentos para los `owner`s. Si luego quieres averigüar el nombre del propietario del `car2`, puedes acceder a la propiedad de la siguiente manera:

```javascript
car2.owner.name
```

Ten en cuenta que siempre se puede añadir una propiedad a un objeto previamente definido. Por ejemplo, la declaración

```javascript
car1.color = 'black';
```

agrega la propiedad `color` a `car1`, y le asigna el valor `"black"`. Sin embargo, esto no afecta a ningún otro objeto. Para agregar la nueva propiedad a todos los objetos del mismo tipo, tienes que añadir la propiedad a la definición del tipo de objeto `Car`.

## Herencia

Todos los objetos en JavaScript heredan de al menos otro objeto. El objeto del que se hereda se conoce como el prototipo, y las propiedades heredadas se pueden encontrar en el objeto `prototype` del constructor. Para más información consulta Herencia y cadena prototipos.

> Hasta Javascript 5, los prototipos han sido el método exclusivo para realizar herencia de objetos. Sin embargo, ECMAScript 6 incluye la posibilidad de usar _classes_, que no dejan de ser un _syntactic sugar_ sobre este uso de prototipos. Si quieres saber más sobre prototipos, puedes realizar el siguiente taller en OW: [https://openwebinars.net/cursos/javascript-prototypes/](https://openwebinars.net/cursos/javascript-prototypes/) 

### Clases ES6

> ¡IMPORTANTE! A lo mejor es un matiz muy sutil, pero no por ello deja de ser importante. Las clases de ES6 no se comportan totalmente como las clases Java. No podemos esperar lo mismo de ellas; debemos tenerlo presentar al trabajar con estas clases en ES6.

### Declaración de clases

Una manera de definir una clase es mediante una declaración de clase. Para declarar una clase, se utiliza la palabra reservada `class` y un nombre para la clase "Rectangulo".

```javascript
class Rectangulo {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
}
```

> ¡OJO! Antes de instanciar una clase, deberás declararla. Si no, tendrás un error.

### Expresiones de clases

Una **expresión de clase** es otra manera de definir una clase. Las expresiones de clase pueden ser nombradas o anónimas. El nombre dado a la **expresión de clase** nombrada es local dentro del cuerpo de la misma.

```javacript
// Anonima
let Rectangulo = class {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
};

console.log(Rectangulo.name);
// output: "Rectangulo"

// Nombrada
let Rectangulo = class Rectangulo2 {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
};
console.log(Rectangulo.name);
// output: "Rectangulo2"
```

### Cuerpo de la clase y definición de métodos

El contenido de una **clase** es la parte que se encuentra entre las llaves `{}`. Este es el lugar se definen los **miembros de clase**, como los **métodos** o **constructores**.

#### Modo estricto

El cuerpo de las declaraciones de clase y las expresiones de clase son ejecutadas en modo estricto. En otras palabras, el código escrito aquí está sujeto a una sintaxis más estricta para aumentar el rendimiento, se arrojarán algunos errores silenciosos y algunas palabras clave están reservadas para versiones futuras de ECMAScript.

> Más información sobre el modo estrícto [aquí](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

#### Constructor

El método `constructor` es un método especial para crear e inicializar un objeto creado con una clase. Solo puede haber un método especial con el nombre "constructor" en una clase. Si esta contiene mas de una ocurrencia del método **`constructor`**, se arrojará un *Error* `SyntaxError`

Un **constructor** puede usar la palabra reservada **`super`** para llamar al **constructor** de una superclase

#### Métodos prototipo

Desde ES6, podemos definir métodos con la siguiente sintaxis:

```javascript
class Rectangulo {
  constructor (alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
  // Getter
  get area() {
     return this.calcArea();
   }
  // Método
  calcArea () {
    return this.alto * this.ancho;
  }
}

const cuadrado = new Rectangulo(10, 10);

console.log(cuadrado.area); // 100
```

> Nótese que el método que tiene como prefijo `get` nos permite acceder a dicho método como un getter, y nos exime de utilizar los paréntesis tras la llamada a dicha función

#### Métodos estáticos

La palabra clave `static` define un método estático para una clase. Los métodos estáticos son llamados sin instanciar su clase y **no** pueden ser llamados mediante una instancia de clase. Los métodos estáticos son a menudo usados para crear funciones de utilidad para una aplicación.

```javascript
class Punto {
  constructor ( x , y ){
    this.x = x;
    this.y = y;
  }

  static distancia ( a , b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt ( dx * dx + dy * dy );
  }
}

const p1 = new Punto(5, 5);
const p2 = new Punto(10, 10);

console.log (Punto.distancia(p1, p2)); // 7.0710678118654755
```

> **¡DANGER!** Esta es una de las diferencias entre el uso de prototipos y el uso de clases ES6. Si usamos `this` dentro de un método estático en una clase ES6 obtendremos `undefined`. Esto no sucedería si trabajáramos con prototipos.

### Subclases con `extends`

Podemos usar `extends` para crear una clase _hija_.

```java
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(this.nombre + ' hace un ruido.');
  }
}

class Perro extends Animal {
  hablar() {
    console.log(this.nombre + ' ladra.');
  }
}
```

También se pueden extender las clases tradicionales basadas en funciones:

```javascript
function Animal (nombre) {
  this.nombre = nombre;
}
Animal.prototype.hablar = function () {
  console.log(this.nombre + 'hace un ruido.');
}

class Perro extends Animal {
  hablar() {
    super.hablar();
    console.log(this.nombre + ' ladra.');
  }
}

var p = new Perro('Mitzie');
p.hablar();
```

> Es importante darse cuenta que no se pueden heredar con `extends` de **objetos regulares** (objetos literales). Para hacerlo sería necesario usar `Object.setPrototypeOf()::`.

### Mix-ins

Podríamos decir que los mix-ins son subclases abstractas o plantillas de clases. Una clase ECMAScript sólo puede tener una clase padre, y por tanto, la herencia múltiple no es posible. 

Pero en ocasiones, eso puede ser frustrante. Imagina que tienes la clase `Barrendero` y la clase `Bicicleta`, y quieres crear la mezcla `BarrenderoEnBibicleta`. El concepto de los mixins nos puede ayudar.

> Wikipedia dice sobre los mixin que es una clase que ofrece cierta funcionalidad para ser heredada por una subclase, pero no está ideada para ser autónoma. Heredar de un mixin no es una forma de especialización sino más bien un medio de obtener funcionalidad. Una subclase puede incluso escoger heredar gran parte o el total de su funcionalidad heredando de uno o más mixins mediante herencia múltiple.
> Más información es [https://es.wikipedia.org/wiki/Mixin](https://es.wikipedia.org/wiki/Mixin)

En definitiva, queremos usar algunos (o todos) los métodos de una clase Base, pero no queremos heredar de ella. En otras palabras, un mixin provee métodos que implementan cierto comportamiento, pero que no queremos que se use de forma autónoma, sino añadiendo dicho comportamiento a otra clase.

#### Ejemplo de un mixin

La forma más sencilla de implementar un mixin en Javascript es crear un objeto que métodos útiles, que podamos fácilmente _mezclar_ con el prototipo de otra clase.

Supongamos la clase `sayHiMixin`, utilizada para añadir _capacidades de habla_ a un `User`:

```javascript
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

Aquí no hay herencia, sino el copiado de métodos. De esta forma, `User` puede heredar de otra clase e incluso incluir el mixin en otra mezcla, para añadir más funcionalidades.

```javascript
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

Los mixins pueden hacer uso de la herencia también.

Por ejemplo, aquí `sayHiMixin` hereda de `sayMixin`:

```javascript
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (or we could use Object.create to set the prototype here)

  sayHi() {
    // call parent method
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
```

Por favor, date cuenta de que para llamar al método del padre `super.say()` desde `sayHiMixin` (líneas señaladas con `*`) se utiliza el método `say` del prototipo del mixin, y no de la clase.

Esto es porque los métodos `sayHi` y `sayBye` son inicialmente creados en `sayHiMixin`. Entonces, aunque fueron _copiados_ su propiedad interna `[[HomeObject]]` referencia a `sayHiMixin`. 

