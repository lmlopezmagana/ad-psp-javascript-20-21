
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

