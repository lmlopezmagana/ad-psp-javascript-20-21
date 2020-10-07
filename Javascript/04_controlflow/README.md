
# Control de flujo

Javascript soporta un conjunto compacto de sentencias, específicamente para el manejo de flujo, que puedes usar para incorporar mayor interactividad a tus aplicaciones. Este capítulo provee una vista general de las mismas.

La guía de referencia de Javascript contiene detalles exhaustivos sobre las sentencias mencionadas en este capítulo. El punto y coma (`;`) se utiliza para separar sentencias en código Javascript.

## Sentencias condicionales

Una sentencia condicional es un conjunto de comandos que se ejecutan si una condición es verdadera. JavaScript soporta dos sentencias condicionales: `if...else` y `switch`

### Sentencia `if...else`

Se utiliza la sentencia `if` para comprobar si la condición lógica es verdadera. Se utiliza la opción `else` para ejecutar un sentencia si la condición es falsa. A continuación se muestra un ejemplo de `if...else`:

```javascript
if (condición) {
    sentencia_1;
} else { 
    sentencia_2;
}
```

Aquí la condición puede ser cualquier expresión que se evalúa a `true` o `false`. Consultar `Boolean` para una explicación de como se evalúa `true` y `false`. Si la condición es verdadera, se ejecuta `sentencia_1`; de lo contrario, se ejecuta `sentencia_2`. La `sentencia_1` y la `sentencia_2` pueden ser cualquier sentencia, incluyendo otras sentencias anidadas en `if`.

También puedes componer sentencias más complejas usando `else if` para tener múltiples condiciones, como se muestra a continuación:

```javascript
if (condición_1) {
  sentencia_1;
} else if (condición_2) {
  sentencia_2;
} else if (condición_n) {
  sentencia_n;
} else {
  ultima_sentencia;
} 
```

En el caso de condiciones múltiples solamente la primera condición lógica que evalúa a verdadero va a ser ejecutada. Para ejecutar múltiples sentencias, agruparlas dentro de sentencias de bloque (`{ ... }`) . En general, usar siempre sentencias de bloque es una buena práctica, sobre todo cuando se anidan sentencias `if`:

```javascript
if (condición) {
  ejecutar_sentencia_1_si_condición_es_verdadera;
  ejecutar_sentencia_2_si_condición_es_verdadera;
} else {
  ejecutar_sentencia_3_si_condición_es_falsa;
  ejecutar_sentencia_4_si_condición_es_falsa;
}
```

Es aconsejable no usar asignación simple dentro de una expresión condicional porque dicha asignación puede ser confundida con el comparador de igualdad cuando se lee de pasada el código. Por ejemplo, no usar el siguiente código:

```javascript
if (x = y) {
  /* sentencias aquí */
}
```

Si necesitas usar una asignación dentro de una expresión de condición, una práctica común es poner paréntesis adicionales alrededor de la asignación. Por ejemplo:

```javascript
if ((x = y)) {
  /* sentencias aquí */
}
```

#### Valores falsos

Los siguientes valores se evalúan como falso (también conocidos como valores [Falsy](https://developer.mozilla.org/es/docs/Glossary/Falsy)):

- `false`
- `undefined`
- `null`
- `0`
- `NaN`
- la cadena vacía (`""`)

El resto de valores, incluídos todos los objetos, son evaluados como verdadero cuando son pasados a una sentencia condicional.

No confundir los valores primitivos booleanos `true` y `false` con los valores `true` y `false` del objeto `Boolean`. Por ejemplo:

```javascript
var b = new Boolean(false);
if (b) // Esta condición se evalua a true
if (b == true) // Esta condición se evalua a false
```

### `switch`

Una sentencia `switch` permite a un programa evaluar una expresión e intentar igualar el valor de dicha expresión a una etiqueta de caso (`case`). Si se encuentra una coincidencia, el programa ejecuta la sentencia asociada. Una sentencia `switch` se describe como se muestra a continuación:

```javascript
switch (expresión) {
  case etiqueta_1:
    sentencias_1
    [break;]
  case etiqueta_2:
    sentencias_2
    [break;]
    ...
  default:
    sentencias_por_defecto
    [break;]
}
```

El programa primero busca una claúsula `case` con una etiqueta que coincida con el valor de la expresión y, entonces, transfiere el control a esa cláusula, ejecutando las sentencias asociadas a ella. Si no se encuentran etiquetas coincidentes, el programa busca la cláusula opcional `default` y, si se encuentra, transfiere el control a esa cláusula, ejecutando las sentencias asociadas. Si no se encuentra la cláusula `default`, el programa continúa su ejecución por la siguiente sentencia al final del `switch`. Por convención, la cláusula por defecto es la última cláusula, aunque no es necesario que sea así.

La sentencia opcional `break` asociada con cada cláusula `case` asegura que el programa finaliza la sentencia `switch` una vez que la sentencia asociada a la etiqueta coincidente es ejecutada y continúa la ejecución por las sentencias siguientes a la sentencia `switch`. Si se omite la sentencia `break`, el programa continúa su ejecución por la siguiente sentencia que haya en la sentencia `switch`.

En el siguiente ejemplo, si `tipoFruta` se evalúa como "Plátanos", el programa iguala el valor con el caso "Plátanos" y ejecuta las sentencias asociadas. Cuando se encuentra la sentencia `break`, el programa termina el `switch` y ejecuta las sentencias que le siguen. Si la sentencia `break` fuese omitida, la sentencia para el caso "Cerezas" también sería ejecutada.

```javascript
switch (tipoFruta) {
  case "Naranjas":
    console.log("Naranjas cuestan 0,59€ el kilo.");
    break;
  case "Manzanas":
    console.log("Manzanas cuestan 0,32€ el kilo.");
    break;
  case "Plátanos":
    console.log("Plátanos cuestan 0,48€ el kilo.");
    break;
  case "Cerezas":
    console.log("Cerezas cuestan 3,00€ el kilo.");
    break;
  case "Mangos":
    console.log("Mangos cuestan 0,56€ el kilo.");
    break;
  case "Papayas":
    console.log("Mangos y papayas cuestan 2,79€ el kilo.");
    break;
  default:
   console.log("Disculpa, no tenemos el tipo de fruta " + tipoFruta + ".");
}
console.log("¿Te gustaría tomar algo?");
```

## Bucles a iteración

Los bucles ofrecen una manera rápida y sencilla de hacer algo repetidamente. Presentamos las diferentes sentencias de iteración disponibles en JavaScript.

Puedes pensar en un bucle como una versión "computarizada" de un juego en el que pides a alguien dar X pasos en una dirección y luego Y (pasos) en otra; por ejemplo, la orden "Da cinco pasos hacia el Este" podría expresarse de la siguiente forma como bucle: 

```javascript
let paso;
for (paso = 0; paso < 5; paso++) {
  // Se ejecuta 5 veces, con valores desde paso desde 0 hasta 4.
  console.log('Dando un paso al Este');
};
```

Hay muchas clases diferentes de bucles, pero todos ellos hacen en esencia lo mismo: repetir una acción un numero de veces (y de hecho es posible que este número sea cero). Los diferentes bucles ofrecen también diferentes formas de determinar sus puntos de inicio y final. Hay determinadas situaciones que se resuelven más fácilmente con un tipo de bucles que otros.

### sentencia `for`

Un bucle for se repite hasta que la condición especificada se evalúa como false. El bucle `for` en JavaScript es similar al de Java y C. Una sentencia `for` se muestra como sigue:

```javascript
for ([expresionInicial]; [condicion]; [expresionIncremento])
  sentencia
```

Cuando un bucle `for` se ejecuta, ocurre lo siguiente:

1. La expresión de inicialización `expresionInicial`, si existe, se ejecuta. Esta expresión habitualmente inicializa uno o mas contadores del bucle, pero la sintaxis permite una expresión con cualquier grado de complejidad. Esta expresión puede también declarar variables.
2. Se evalúa la expresión `condicion`. Si el valor de `condicion` es true, se ejecuta la sentencia del bucle. Si el valor de `condicion` es false, el bucle `for` finaliza. Si la expresión `condicion` es omitida, la condición es asumida como verdadera.
3. Se ejecuta la `sentencia`. Para ejecutar múltiples sentencias, use un bloque de sentencias (`{ ... }`) para agruparlas.
4. Se ejecuta la expresión `expresionIncremento`, si hay una, y el control vuelve al paso 2.

```javascript
for (const i = 0; i < 10; i++) {
  console.log(i);
}
```

### sentencia `do...while` 

La sentencia `do...while` se repite hasta que la condición especificada que se evalúa sea false. Una sentencia `do...while` se mostrará como sigue:

```javascript
do
  sentencia
while (condicion);
```

`sentencia` se ejecuta antes de que la condición sea evaluada. Para ejecutar múltiples sentencias, use un bloque de sentencias (`{ ... }`) para agruparlas. Si condicion es `true`, la sentencia se ejecuta de nuevo. Al final de cada ejecución, la condición es comprobada. Cuando la condición es falsa, la ejecución se detiene y el control pasa a la sentencia siguiente al `do...while`.

En el siguiente ejemplo, el bucle `do` itera al menos una vez y vuelve a hacerlo mientras i sea menor que 5.

```javascript
do {
  i += 1;
  console.log(i);
} while (i < 5);
```

### sentencia while

Una sentencia `while` ejecuta sus sentencias mientras la condición sea evaluada como verdadera. Una sentencia `while` tiene el siguiente aspecto:

```javascript
while (condicion)
  sentencia
```

Si la condición cambia a falsa, la `sentencia` dentro del bucle deja de ejecutarse y el control pasa a la sentencia inmediatamente después del bucle.

La condición se evalúa antes de que la `sentencia` contenida en el bucle sea ejecutada. Si la condición devuelve verdadero, la `sentencia` se ejecuta y la condición se comprueba de nuevo. Si la condición es evaluada como falsa, se detiene la ejecución y el control pasa a la sentencia siguiente al `while`.

Para ejecutar múltiples sentencias, use un bloque de sentencias (`{ ... }`) para agruparlas.

El siguiente bucle `while` itera mientras n sea menor que tres:

```javascript
let n = 0;
let x = 0;
while (n < 3) {
  n++;
  x += n;
}
```

Con cada iteración, el bucle incrementa `n` y añade ese valor a `x`. Por consiguiente, `x` y `n` toman los siguientes valores:

* Después del primer paso: `n` = 1 y `x` = 1
* Después del segundo paso: `n` = 2 y `x` = 3
* Después del tercer paso: `n` = 3 y `x` = 6

Tras completar el tercer paso, la condición `n < 3` ya no es verdadera, por tanto el bucle termina.

### sentencia `for...in`

La sentencia `for...in` itera una variable especificada sobre todas las propiedades enumerables de un objeto. Para cada propiedad distinta, JavaScript ejecuta las sentencias especificadas. Una sentencia `for...in` será como sigue:

```javascript
for (variable in objeto) {
  sentencias
}
```

En el siguiente ejemplo, podemos ir recorriendo un array de `String` mediante este bucle:

```javascript
const frutas = ['Peras', 'Manzanas', 'Fresas', 'Papayas', 'Mangos'];
for (const fruta in frutas) {
    console.log(frutas[fruta])
}
```

### sentencia `for...of`

La sentencia `for...of` crea un bucle iterando sobre objetos iterables (incluyendo `Array`, `Map`, `Set`, [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments), objetos etc), invocando una iteración personalizada conectando con sentencias para ser ejecutadas por el valor de cada propiedad distinta.

```javascript
for (variable of objeto) {
  sentencia
}
```

El siguiente ejemplo muestra la diferencia entre un bucle `for...of` y un bucle `for...in`. Mientras `for...in` itera sobre nombres de propiedades, `for...o`f itera sobre valores de propiedades:

```javascript
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (let i of arr) {
   console.log(i); // logs "3", "5", "7"
}
```