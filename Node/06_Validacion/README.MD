
# 06 Validación

Continuando con el ejemplo anterior, vamos a implementar la validación de las entradas.

## 6.1 Validación de entradas

Nuestra API va a recibir datos de distintas formas. Una de ellas será, simplemente, los argumentos que nos puedran proporcionar a través del path en una petición, como `/users/7`. Si suponemos que debe ser un número, ¿qué ocurriría si nos pasan una cadena de caracteres? Otro ejemplo, de validaciones más finas, podría ser en el cuerpo de una petición. Por ejemplo, esperamos un atributo email, que tiene una forma determinada, y nos proporcionan otra cadena de caracteres sin ese formato.

Es por ello que debemos preocuparnos de validatar y _normalizar_ los datos que nos lleguen, para prevenir posibles fallos. Para ello, vamos a utilizar una extendida librería llamada `express-validator`.

Para añadirla a nuestro proyecto ejecutamos:

```bash
npm i --save express-validator
```

## 6.2 Validación de parámetros

Vamos a comenzar con una validación muy básica, que nos va a permitir verificar si el ID que recibimos como parte del path de una ruta es un número entero o no lo es.

Para ello, vamos a trabajar directamente sobre el router de usuarios.

> ¡OJO! Este código lo refactorizaremos después, para organizarlo y estructurarlo mejor.

Primero, importamos lo necesario. En este caso, vamos a importar una función, llamada `param`, que nos permite validar los parámetros de una petición.

```javascript
import { param } from 'express-validator';
```

A continuación, definimos como un array, los middleware de validación para una petición. Ojo con esta estructura que inicialmente puede parecer un poco rara:

```javascript
router.get('/:id', [
        param(...)
    ],
    UserController.usuarioPorId);
```

A continuación, le indicamos con `param` el parámetros que queremos validar, y la validación que queremos aplicar. En nuestro caso es el `'id' `, y queremos que sea un número entero. Además, si no lo es, proporcionamos un mensaje de error.

```javascript
router.get('/:id', [
        param('id').isInt().withMessage('ID debe ser un número entero')
    ],
    UserController.usuarioPorId);
```

Además de `isInt()`, tenemos una larga lista de funciones de validación a nuestra disposición.

> Estos métodos de validación vienen de la librería `validators.js`. Puedes verla aquí: [https://github.com/validatorjs/validator.js#validators](https://github.com/validatorjs/validator.js#validators)

Solamente con esto, estamos consiguiendo la vaildación. Sin embargo, queremos detectar si ha habido algún error, y actuar en consecuencia. En nuestro caso, si hay error, porque el ID no es un número entero, devolvemos un error 400.

Para ello, tenemos que actualizar nuestro controlador:

```javascript

import { validationResult } from 'express-validator';

const UserController = {

    usuarioPorId: (req, res) => {

        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            res.status(400).json(errores.array())
        } else {

            let user = userRepository.findById(req.params.id);
            if (user != undefined) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }
    },

};
```

Alguno de vosotros se puede preguntar si ahora vamos a tener que modificar todos nuestros controladores para _copiar y pegar_ este código. Tenemos una **solución mejor**. Podemos crear un _middleware_ que se encargue de obtener el resultado de la validación y, si hay errores, _cortocircuitar_ la petición, devolviendo los errores. En caso de que no haya error, la petición puede continuar realizandose como debe.

Para ello, creamos en la carpeta de middlewares un fichero llamado `src/middlewares/validacion.js`, con el siguiente código:

```javascript
import { validationResult } from 'express-validator';

export const validar = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        res.status(400).json(errores.array())
    } else {
        next();
    }
}
```

Y refactorizamos el código anterior:

`src/controllers/user.js`
```javascript

    usuarioPorId: (req, res) => {

            let user = userRepository.findById(req.params.id);
            if (user != undefined) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }

    },
```

`src/routes/user.js`
```javascript
import { validar } from '../middlewares/validacion'

// Resto del código

router.get('/:id', [
        param('id').isInt().withMessage('ID debe ser un número entero')
    ],
    validar,
    UserController.usuarioPorId);
```

De esta forma, podemos añadir la validación a todas las peticiones que la requieran.

> En la documentación de `express-validator` encontramos una forma algo más sofisticada de realizar este proceso: [https://express-validator.github.io/docs/running-imperatively.html](https://express-validator.github.io/docs/running-imperatively.html).

## 6.3 Validación del cuerpo

Más importante si cabe que la validación de parámetros de la URL es la validación que apliquemos a los objetos que recibamos a través del cuerpo de las peticiones.

En este caso, la clase `User` está levemente modificada para guardar un `id`, un `username` y un `email`. 

`src/models/users.js`
```javascript
class User {

    // modificamos el constructor, dejando el id al final para hacerlo optativo
    constructor(username, email, id=0) {
        this.id = id;
        this.username = username;
        // Añadimos el email como un atributo más
        this.email = email;
    }


}

let users = [
    new User('Luis Miguel López', 'luismi@email.com', 1),
    new User('Ángel Naranjo', 'angel@email.com', 2)
];

const userRepository = {

    // ...
    ,
    // Inserta un nuevo usuario y devuelve el usuario insertado
    create(newUser) {
        const lastId = users.length == 0 ? 0 : users[users.length-1].id;
        const newId = lastId + 1;
        const result = new User(newUser.username, newUser.email, newId);
        users.push(result);
        return result;
    },
    //...
}
```


Queremos que, al dar de alta un nuevo usuario:

- No se nos proporcione un ID, ya que lo vamos a autogenerar
- El `username` tenga como mínimo 5 caracteres
- El `email` sea un email válido, y no una cadena cualquiera.

Para ello, debemos importar y utilizar la función `body` de `express-validator`, y definir los validadores necesarios en el fichero `/src/routes/users.js`.

```javascript
import { param, body } from 'express-validator';

router.post('/', [
        body('username').isLength({min: 5}).withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
        body('email').isEmail().withMessage('El campo email debe ser un email válido'),
        body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
    ],
    validar, 
    UserController.nuevoUsuario);

```

Si en algún caso queremos aplicar una validación similar para la petición `PUT`, podríamos definir este array a nivel del fichero `src/routes/user.js`, o incluso en el propio modelo, para reutilizarlo en diferentes peticiones.

## 6.4 Validación personalizada

Supongamos que queremos añadir una validación personalizada. En este caso, no queremos tener 2 emails repetidos en usuarios diferentes. Para aquellas validaciones no contempladas a priori, tenemos el método `custom`, que nos permitirá realizar la validación que necesitemos.

Vamos a añdir un método que nos permita comprobar si un email ya está registrado como parte de un usuario:

`src/models/users.js`
```javascript
const emailExists = (email) => {
    let emails = users.map(user => user.email);
    return emails.includes(email);
}
```

Ahora, añadimos el uso de esta función como parte de la validación de la petición `POST`.

`src/routes/user.js`
```javascript
router.post('/', [
        body('username').isLength({min: 5}).withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
        body('email')
            .isEmail()
            .withMessage('El campo email debe ser un email válido')
            .custom(email => {
                if(emailExists(email)) {
                    throw new Error('El email ya está registrado. Proporcione un valor diferente');
                } else {  
                    return true;
                }
            }),
        body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
    ],
    validar, 
    UserController.nuevoUsuario);
```
## 6.5 Validaciones más complejas

En el caso de requerir validaciones más complejas, podemos utilizar la validación basada en esquema. Los esquemas son una forma especial, basada en objetos, de definir validaciones o desinfecciones (_sanitize_) en las peticiones. En dicho objeto, debes definir como claves (propiedades) los campos que quieres validar; y como valores, un objeto con las propias validaciones o desinfecciones a aplicar. 

> Tienes más información en [https://express-validator.github.io/docs/schema-validation.html](https://express-validator.github.io/docs/schema-validation.html)

Este tipo de validación nos permitiría refactorizar un poco el código, de la siguiente forma:

- Se podría definir el esquema junto al propio objeto modelo.
- Se podría utilizar el método `checkSchema` para validar todo el esquema.
- También se podría envolver dicha función en otra que pudiera tener un nombre más acorde, o que hiciera alguna tarea adicional.


# Bibliografía

1. [https://express-validator.github.io/docs/index.html](https://express-validator.github.io/docs/index.html)
2. [https://flaviocopes.com/express-validate-input/](https://flaviocopes.com/express-validate-input/)
3. 