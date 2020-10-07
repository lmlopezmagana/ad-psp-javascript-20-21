
# Módulos ES6

## Antecedentes

Los programas JavaScript comenzaron siendo bastante pequeños — la mayor parte de su uso en los primeros días era para realizar tareas de scripting aisladas, proporcionando un poco de interactividad a tus páginas web donde fuera necesario, por lo que generalmente no se necesitaban grandes scripts. Avancemos unos años y ahora tenemos aplicaciones completas que se ejecutan en navegadores con mucho JavaScript, JavaScript ahora se usa en otros contextos (Node.js, por ejemplo).

Por lo tanto, en los últimos años se ha comenzado a pensar en proporcionar mecanismos para dividir programas JavaScript en módulos separados que se puedan importar cuando sea necesario. Node.js ha tenido esta capacidad durante mucho tiempo, y hay una serie de bibliotecas y marcos de JavaScript que permiten el uso de módulos (por ejemplo, CommonJS y AMD otros basados en sistemas de módulos como RequireJS, y recientemente Webpack y Babel).

La buena noticia es que los navegadores modernos han comenzado a admitir la funcionalidad de los módulos de forma nativa, y de esto se trata este artículo. Esto solo puede ser algo bueno — los navegadores pueden optimizar la carga de módulos, haciéndolo más eficiente que tener que usar una biblioteca y hacer todo ese procesamiento adicional de lado del cliente, ahorrando viajes de ida y vuelta adicionales.

## Antes de exportar e importar

Para que node no nos lance un error a la hora de usar `export` e `import`, que son las palabras reservadas para realizar la exportación e importación, necesitamos que nuestro proyecto tenga un fichero `package.json` (todos los proyectos de node.js van a tener uno), y que como parte de ese fichero de configuración, añadamos, en el nivel superior del mismo, la siguiente entrada:

```json
"type": "module"
```

> La forma más sencilla de generar el fichero `package.json` es a través del comando `npm init`.

## Exportar e importar

### Exportar

Lo primero que debes hacer para acceder a las funciones del módulo es exportarlas. Esto se hace usando la declaración `export`.

La forma más sencilla de utilizarla es colocarla delante de cualquier elemento que desees exportar fuera del módulo, por ejemplo:

```javascript
//Ejemplo 1

export function suma(a,b) { 
    return a + b;
}

export const PI = 3.141593;


export function Punto(x, y) {
    this.x = x;
    this.y = y;
    this.distancia = function(otro) {
        return Math.sqrt((otro.x - this.x)**2 - (otro.y - this.y)**2);
    }
}

```

Puedes exportar funciones, `var`, `let`, `const` y, como veremos más adelante — clases. Deben ser elementos de nivel superior; no puedes usar `export` dentro de una función, por ejemplo.

Una forma más conveniente de exportar todos los elementos que deseas exportar es usar una sola declaración de exportación al final de tu archivo de módulo, seguida de una lista separada por comas de las características que deseas exportar entre llaves. Por ejemplo:

```javascript

function suma(a,b) { 
    return a + b;
}

const PI = 3.141593;


function Punto(x, y) {
    this.x = x;
    this.y = y;
    this.distancia = function(otro) {
        return Math.sqrt((otro.x - this.x)**2 - (otro.y - this.y)**2);
    }
}

export { suma, PI, Punto };
```

### Importar

Una vez que hayas declarado las funciones y características que deseas exportar de tu módulo, debes importarlas en tu script para poder usarlas. La forma más sencilla de hacerlo es la siguiente:

```javascript
import { suma, PI, Punto } from './libs/maths.js';
```

Utiliza la declaración `import`, seguida de una lista separada por comas de las características que deseas importar entre llaves, seguida de la palabra clave `from`, seguida de la ruta al archivo del módulo.

> En algunos sistemas de módulos, puedes omitir la extensión del archivo y el punto (por ejemplo, `'/modules/square'`). Esto no funciona en módulos de JavaScript nativos.

Una vez importados, puedes utilizar los diferentes elementos como si los hubieras definido en el mismo fichero:

```javascript
import { suma, PI, Punto } from './libs/maths.js';

console.log(PI);
console.log(suma(1,2));

let a = new Punto(3,2);
let b = new Punto(-3,-3);
let distancia = a.distancia(b);
console.log(`La distancia entre a y b es ${distancia.toFixed(2)}`);
```

## Exportaciones por defecto vs. exportaciones con nombre

La funcionalidad que hemos exportado hasta ahora se compone de **exportaciones con nombre**; cada elemento (ya sea función, `const`, etc..) se ha denomidado por su nombre en `export` y ese nombre se ha utilizado también en `import`.

También hay otro tipo de exportación, llamada **predeterminada**  o **por defecto**, diseñado para facilitar que un módulo proporcione una función predeterminada, implementada por un tercero, que nos evite conocer el nombre específico con el que se exportó.

```javascript
//Ejemplo 2
// Generate random integer between min,max both included
function getRndInteger(max,min) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndInteger1and10() {
    return getRndInteger(1,10);
}

function getRndInteger1and100() {
    return getRndInteger(1,100);
}


export default getRndInteger

export { getRndInteger1and10, getRndInteger1and100 }
```

En nuestro archivo `app.js` importamos la función predeterminada (y también las demás), de esta forma:

```javascript

//import aleatorio, { getRndInteger1and10, getRndInteger1and100} from './libs/random.js';
import {default as aleatorio, getRndInteger1and10, getRndInteger1and100 } from './libs/random.js';

console.log(aleatorio(1,15));
console.log(getRndInteger1and100());
```

> Como podemos comprobar, podemos darle un alias a los elementos importados, para renombrarlos de forma más acorde a lo que necesitemos.

## Crear un objeto `module`

El método anterior funciona bien, pero es un poco complicado y largo. Una solución aún mejor es importar las características de cada módulo dentro de un objeto module. La siguiente forma de sintaxis hace eso:

```javascript
import * as Module from './modules/module.js';
```

Esto toma todas las exportaciones disponibles dentro de module.js y las hace disponibles como miembros de un objeto `Module`, dándole efectivamente su propio espacio de nombres. Así por ejemplo:

```javascript
Module.function1()
Module.function2()
etc.
```

Incluso, podremos mezclar importaciones por defecto y la importación del objeto `Module`.

```javascript
// Ejemplo 3
// libs/random.js
// Generate random integer between min,max both included
function getRndInteger(max,min) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndInteger1and10() {
    return getRndInteger(1,10);
}

function getRndInteger1and100() {
    return getRndInteger(1,100);
}


export default getRndInteger

export { getRndInteger1and10, getRndInteger1and100 }
```

```javascript
// app.js
import aleatorio, * as Random from './libs/random.js';

console.log(aleatorio(1,15));
console.log(Random.getRndInteger1and100());
```

Revisando la estructura de la sentencia de importación vemos que:

- Tras la palabra reservada `import`, importamos lo que se ha exportado por defecto, con el nombre `aleatorio`.
- Separado por una coma, encontramos `* as Random`, de forma que obtenemos un objeto `Module` con todas las _funcionalidades_ exportadas.

## Módulos y clases

También se puede hacer la exportación/importación de clases ES6.

