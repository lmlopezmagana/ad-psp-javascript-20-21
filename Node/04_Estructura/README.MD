
# 04 Estructura de un proyecto

En los ejemplos anteriores hemos ido viendo, poco a poco, cómo podemos crear una API REST con Node y Express. Vamos a detenernos un poco para ir añadiendo algo de estructura a nuestro proyecto, de forma que nos permita organizar el código de una forma sistemática.

> ¡OJO! Este tutorial no se tiene que tomar como algo paradigmático. Es UNA forma de estructurar el código. Se pueden proponer muchas otras. 

## 4.1 Primeros pasos

Los primeros pasos serían los que hemos dado en los tutoriales anteriores:

- npm init -y
- instalar nodemon
- instalar y configurar babel
- instalar dotenv
- instalar express
- instalar cors
- instalar body-parser

## 4.2 Logging

No, *logging* (con dos g) no tiene nada que ver con la autenticación, sino con la información de traza o bitácora que va dejando nuestra aplicación mientras se usa.

Esta información es muy útil tanto durante el desarrollo como incluso en producción, para poder detecar posibles errores, problemas o dificultades. Para ello, vamos a utilizar dos librerías:

- morgan: probablemente la librería de _logging_ con Express más utilizada. Nos dará mucha información sobre las peticiones y respuestas.
- morgan-body: no tan usada como la anterior, pero que la complementa, ya que nos mostrará también la información sobre el cuerpo de peticiones y/o respuestas.

Para instalarlas ejecutamos los comandos 

```bash
npm install --save morgan
npm install --save morgan-body
```

Ahora, en el fichero `index.js` las importamos y configuramos

```javascript
import morgan from "morgan";
import morganBody from "morgan-body";
...
app.use(morgan('dev'))
morganBody(app);
```

Como resultado, cuando hagamos peticiones, nos aparecerá algo parecido a esto por la consola:

```
Request: GET / at Mon Nov 30 2020 11:52:49 GMT+0100, IP: ::1, User Agent: curl/7.64.1
Response Body:
{
        "message": "Hola Mundo"
}
Response: 200 1.945 ms 
```

## 4.3 Estructura de directorios

Como te decía antes, esta estructura es una propuesta. Se podría utilizar otra que sería igualmente o más válida. Todo depende de a lo que estés acostumbrado tú o tu equipo de trabajo.

Te propongo crear un directorio:

- `models`: para nuestros modelos y repositorio, es decir, las entidades que vamos a manejar y el acceso a la capa de persistencia
- `routes`: para la configuración modularizada del enrutamiento. 
- `services`: aquí podríamos definir la lógica de negocio de nuestra aplicación, es decir, donde se utilizan uno o varios repositorios para realizar las tareas propias de esta aplicación. También podemos añadir aquí otros servicios de tareas transversales, como la seguridad, conexión a base de datos, ..
- `controllers`: añadiremos los diferentes controladores de cada petición, para posteriormente asignarlos a cada ruta en la capa de enrutamiento.
- `middlewares`: en este módulo podríamos ubicar otra serie de middelwares que nos puedan ser útiles, como los referentes a seguridad, manejo de errores, utilidades, etc.

**En cada uno de ellos tenemos un index.js que importa todo lo necesario dentro del módulo, y posteriormente lo exporta, exponiéndolo de una forma uniforme.
**

Posteriormente podremos añadir algunos más para:

- configuración
- seguridad
- utilidades
- ....

## 4.4 Punto de partida en `index.js`

Comenzamos con un código así en nuestro fichero de entrada, `index.js`:

```javascript
import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import morganBody from "morgan-body";

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);


app.listen(process.env.PORT, () =>
  console.log(
    `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
  )
);
```

## 4.5 Creación del modelo

Para nuestro modelo, vamos a crear, dentro de la carpeta `models`, dos ficheros: 

- `index.js`: importará todos los modelos que hay dentro de la carpeta y los exportará, de una manera uniforme.
- `users.js`: donde podremos escribir el código de nuestro modelo. En este ejemplo sencillo también incluiremos dentro el repositorio, que no será más que una clase que maneje una colección (posteriormente trabajaremos con Mongoose para conectar con una base de datos MongoDB).

`users.js`
```javascript
class User {

    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

}
```

> Esta clase podría tener muchos más métodos y atributos, pero por ahora nos será suficiente.

A modo de repositorio, podemos añadir en el mismo fichero el siguiente código: 

`users.js`
```javascript
let users = [
    new User(1, 'Luis Miguel López'),
    new User(2, 'Ángel Naranjo')
];


const userRepository = {

    findAll() {
        return users;
    },
    findById(id) {
        let result = users.filter(user => user.id == id);
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
    }

}


export  {
    User,
    userRepository
}
```

El código no tiene mucha dificultad. Incluimos:

- Un método para obtener todos los usuarios.
- Otro para obtener uno por su ID.

> Si te fijas, el modelo es una clase, y el repositorio es un objeto.

Exportamos ambos, para poder importarlos en el fichero `index.js`

El fichero `index.js` podría quedar así:

```javascript
import * as users from './users';

export default {
    users
}
```

## 4.6 Importación, configuración y uso del modelo.

Para utilizar el modelo desde nuestro fichero principal, `src/index.js`, tenemos que importarlo:

```javascript
...
import models from './models';
...
```

Con esto podríamos tener suficiente. Con todo **algunos programadores suelen añadir dentro del contexto de la petición, en `req.context`, algunos (o todos) los modelos del API, para acceder rápidamente a ellos desde cualquier lugar en el que tengamos acceso a un objeto `req`. Ello se consigue con el siguiente código:

```javascript
app.use((req, res, next) => {
  // Para cualquier petición, añadimos en su contexto
  req.context = {
    // Todos los modelos
    models,
    // El "usuario actual". Ahora mismo simula que hayamos hecho un login
    // Más adelante, lo podremos conseguir de otra forma.
    me: models.users.userRepository.findById(1)
  };
  next();
});
```

> También vamos a simular que este API ya está realizando la autenticación, y que al realizar una petición, de alguna forma, sabemos el usuario que lo ha realizado. Lo hacemos almacenando, en `req.context.me` el "usuario autenticado" que, en este caso, sería el usuario con id = 1.

## 4.6 Enrutamiento

Ahora tocaría organizar las diferentes rutas y verbos HTTP en las cuales vamos a atender peticiones.

> Normalmente, cuando se está implementando un "CRUD de una entidad", se suelen tener estas combinaciones de rutas y verbos.

Como ruta, se suele utilizar el nombre de la entidad (hay grandes discusiones sobre si usarlo en singular o en plural; nosotros lo usaremos algunas veces de una forma, y otras de la otra).

| Verbo | Ruta | Descripción | Cuerpo de la petición | Respuesta correcta | Problemas
|-------|------|-------------|-----------------------|--------------------|-----------
| `GET` | `/user/` | Petición para obtener todos los usuarios | Vacío | (200) Un array con todos los usuarios | (404) No hay usuarios
| `GET` | `/user/:id` | Petición para obtener un usuario por su ID | Vacío | (200) El usuario | (404) No hay usuarios con ese ID.
| `POST` | `/user/` | Petición para crear un usuario | Un documento json con la estructura de usuario | (201) El usuario recién creado | (400) Petición incorrecta
| `PUT` | `/user/:id` | Petición para modificar un usuario | Un documento json con la estructura de usuario | (200) El usuario modificado | (400) Petición incorrecta, (404) Usuario no encontrado
| `DELETE` | `/user/:id` | Petición para eliminar un usuario | Vacío | (204) Cuerpo vacío | Sin problemas

Al igual que en el modelo, creamos un fichero `index.js` mediante el cuál vamos a exponer todos los enrutamientos que vayamos creando en `/routes` de forma ordenada.

`index.js`
```javascript
import user from './user';

export default {
    user
}
```

En Express.js un objeto `Router` es una instancia aislada de middleware y rutas. Puedes pensar en él como una "mini-aplicación", capaz solo de realizar funciones de middleware y enrutamiento. Cada aplicación Express tiene un enrutador de aplicaciones incorporado.

Un enrutador se comporta como un middleware en sí mismo, por lo que puede usarlo como argumento para `app.use()` o como argumento para el método `use()` de otro enrutador.

> Si quieres saber más sobre los objetos Router o sus métodos, puedes visitar la siguiente url: [https://expressjs.com/es/4x/api.html#router](https://expressjs.com/es/4x/api.html#router)


`user.js`
```javascript
import { Router } from 'express';

const router = Router();

router.get('/', /* método controlador */)
router.get('/me', /* método controlador */);
router.get('/:id', /* método controlador */);

// Resto de métodos del router

export default router;
```

Más adelante volveremos a revisitar este código para completarlo.

## 4.7 Controladores (a.k.a. middlewares)

Como podemos comprobar, ahora tenemos que asignar, a cada pareja tipo de petición HTTP-Ruta un método controlador. Un controlador, también conocido en Express.js como un middleware, es un método que recibe al menos dos parámetros (puede recibir tres): uno de tipo `Request` y otro de tipo `Response`, y no dista de la forma de trabajar de otros frameworks o APIs para hacer aplicaciones HTTP (por ejemplo, los servlets de Java).

Más formalmente, las funciones de middleware son funciones que tienen acceso al objeto de solicitud (`req`), al objeto de respuesta (`res`) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada `next`.

Las funciones de middleware pueden realizar las siguientes tareas:

- Ejecutar cualquier código.
- Realizar cambios en la solicitud y los objetos de respuesta.
- Finalizar el ciclo de solicitud/respuestas.
- Invocar el siguiente middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar `next()` para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.

![Estructura de un middleware](./img01.png)

Desde el punto de vista del uso, Express es una infraestructura web de direccionamiento y middleware que tiene una funcionalidad mínima propia: una aplicación Express es fundamentalmente una serie de llamadas a funciones de middleware.

> Si quieres conocer la estructura del objeto solicitud (`req`) puedes pulsar el siguiente enlace: [https://expressjs.com/es/4x/api.html#req](https://expressjs.com/es/4x/api.html#req). Si lo que quieres es conocer la estructura del objeto respuesta (`res`), puedes pulsar el siguiente enlace: [https://expressjs.com/es/4x/api.html#res](https://expressjs.com/es/4x/api.html#res)

Existen diferentes tipos de middlewares:

- A nivel de aplicación
- A nivel de enrutador
- Para manejo de errores
- De terceros
- ....

En este caso, nos vamos a centrar en los middlewares a nivel de enrutador o direccionador. El middleware de nivel de direccionador funciona de la misma manera que el middleware de nivel de aplicación, excepto que está enlazado a una instancia de `express.Router()`.

Puedes utilizar las funciones de middleware  de direccionador utilizando las funciones `router.use()` (para cualquier tipo de petición HTTP) o `router.METHOD()` (para asociarla a un verbo en particular).

El siguiente es un código de ejemplo de un middleware que se asocia con `router.use()`, y que funcionaría para cualquier ruta de dicho direccionador, así como cualquier verbo HTTP. Su función sería mostrar por consola la fecha/hora en la que se realiza la petición.

```javascript
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
```

El siguiente bloque de código nos muestra un middleware que se ejecuta cuando se realiza cualquier petición a la ruta `/user/:id`, y que nos mostraría por consola información sobre la petición.

```javascript
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

En nuestro caso, queremos una serie de middlewares para manejar las diferentes peticiones que hemos definido en el punto 4.6.

> Como llevamos argumentando a lo largo de todo este ejemplo, no hay una única forma de estructurar el código. Aquí vamos a separar los middlwares de direccionamiento en una carpeta llamada `/controllers`.

Al igual que en los anteriores pasos, creamos un fichero `index.js` para exponerlo todo de forma ordenada. Para los controladores de usuario creamos un fichero `user.js`.

> Con todo, en este caso es posible que nos interese importar cada fichero por separado.

`index.js`
```javascript
import userController from './user';


export default {
    userController
}
```

Por ahora, vamos a implementar los controladores de las dos peticiones GET

`user.js`
```javascript
import { users } from '../models/';


const UserController = {

    todosLosUsuarios : (req, res) => {
        res.json(req.context.models.users.userRepository.findAll());
    },

    usuarioPorId : (req, res) => {
        let user = req.context.models.users.userRepository.findById(req.params.id);
        if (user != undefined) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
        
    }

};

export  {
    UserController
}
```

Podemos observar que en _lugar de una clase_ hemos creado un objeto que aglutina una serie de métodos middlware. 

> Algunos programadores prefieren definir una serie de funciones _sueltas_ que exportan por separado, y que utilizan donde convenga. Aquí, hemos decidido agrupar todas ellas en un objeto, para exportarlo de forma conjunta.

# 4.8 Volvemos al punto de partida

Una vez que hemos definido el modelo (y repositorio), el direccionador y los middlewares, **podemos meter todo en la coctelera**. Vamos a volver hacia atrás en cascada, conjugando todo lo que ya hemos programado.

### 4.8.1 Conexión del router con los middlware controladores

Nuestro código del direccionador estaba a al espera de poder conectar los middlware controladores. El código podría quedar así:

```javascript
import { Router } from 'express';

import { UserController } from '../controllers/user';

const router = Router();

router.get('/', UserController.todosLosUsuarios)

router.get('/:id', UserController.usuarioPorId);

export default router;
```

Asignamos:

- Ruta
- Método HTTP
- Método middleware del controlador

### 4.8.2 Conexión del router con la aplicación

Como comentábamos antes, un direccionador (router) funciona también como una especie de middlware, que se puede asociar a otro direccionador, que puede ser el direccionador a nivel de aplicación. Aquí, podemos asignar una ruta a un direccionador, con un código como el siguiente:

```javascript
app.use('/users', routes.user);
```

De esta forma, las rutas de los diferentes direccionadores se concatenan. En este ejemplo, había una petición asociada al router en la ruta `/`. Al asociar todo el router a la ruta `/users`, la petición finalmente queda asociada a la ruta `/users/`.

El código de nuestro fichero `src/index.js` quedaría entonces así (se muestra parcialmente):

```javascript
// Imports de librerías
import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import morganBody from "morgan-body";

// Imports de componentes del API
import models from './models';
import routes from './routes';

// Instanciación de la aplicación de Express
const app = express();

// Inicialización y configuración de algunos middlewares

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
morganBody(app);

// .....

// Configuración de las rutas.
app.use('/users', routes.user);

// Inicialización del servidor
app.listen(process.env.PORT, () =>
  console.log(
    `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
  )
);
```

Ya podemos poner nuestra app en ejecución y comprobar (bien con cURL o con Postman) que las peticiones funcionan correctamente.


# Bibliografía

1. Documentación de Express.js


