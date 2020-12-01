
# 05 Resto de peticiones

Continuando con el ejemplo anterior, vamos a implementar las peticiones POST, PUT y DELETE.

## 5.1 Añadimos lo necesario en el modelo (y repositorio)

El código del repositorio podría quedar así:

> Recuerda que cuando trabajemos con una base de datos esto será diferente

```javascript
class User {

    constructor(id, username) {
        this.id = id;
        this.username = username;
    }


}

let users = [
    new User(1, 'Luis Miguel López'),
    new User(2, 'Ángel Naranjo')
];

// Método que nos va a permitir obtener la posición de un
// usuario dentro de la colección en base a su ID
// Devuelve la posición si lo encuentra, y -1 si no lo encuentra.
const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < users.length && posicionEncontrado == -1; i++) {
        if (users[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    findAll() {
        return users;
    },
    // Devuelve un usuario por su Id
    findById(id) {
        /*
        let result = users.filter(user => user.id == id);
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
        */
       const posicion = indexOfPorId(id);
       return posicion == -1 ? undefined : users[posicion];
    },
    // Inserta un nuevo usuario y devuelve el usuario insertado
    create(newUser) {
        const lastId = users.length == 0 ? 0 : users[users.length-1].id;
        const newId = lastId + 1;
        const result = new User(newId, newUser.username);
        users.push(result);
        return result;
    },
    // Actualiza un usuario identificado por su ID
    updateById(id, modifiedUser) {
        const posicionEncontrado = indexOfPorId(id)
        if (posicionEncontrado != -1) {
            users[posicionEncontrado].username = modifiedUser.username;
        }
        return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    delete(id) {
        const posicionEncontrado = indexOfPorId(id);
        if (posicionEncontrado != -1)
            users.splice(posicionEncontrado, 1);
    }

}


export  {
    User,
    userRepository
}
```

- Añadimos un método auxiliar, que será utilizado en varios otros métodos, y que nos sirve para localizar la posición de un usuario por su ID.
- Añadimos los métodos para insertar un nuevo usuario, actualizar un usuario y borrar un usuario. Recuerda que esta implementación es una propuesta, y que habría otras formas de hacerlo.

## 5.2 Añadimos lo necesario en el router

Si recuerdas del ejemplo anterior, las peticiones que teníamos definidas (para conformar nuestro CRUD) eran las siguientes:

| Verbo | Ruta | Descripción | Cuerpo de la petición | Respuesta correcta | Problemas
|-------|------|-------------|-----------------------|--------------------|-----------
| `GET` | `/user/` | Petición para obtener todos los usuarios | Vacío | (200) Un array con todos los usuarios | (404) No hay usuarios
| `GET` | `/user/:id` | Petición para obtener un usuario por su ID | Vacío | (200) El usuario | (404) No hay usuarios con ese ID.
| `POST` | `/user/` | Petición para crear un usuario | Un documento json con la estructura de usuario | (201) El usuario recién creado | (400) Petición incorrecta
| `PUT` | `/user/:id` | Petición para modificar un usuario | Un documento json con la estructura de usuario | (200) El usuario modificado | (400) Petición incorrecta, (404) Usuario no encontrado
| `DELETE` | `/user/:id` | Petición para eliminar un usuario | Vacío | (204) Cuerpo vacío | Sin problemas

Tenemos, por tanto, que definir las peticiones POST, PUT y DELETE, pero primero crearemos los métodos del controlador.

## 5.3 Añadimos los controladores

Tenemos que añadir un método de controlador para cada una de las peticiones anteriores. Hemos refactorizado un poco el código de las anteriores. Por tanto, el fichero `controllers/users.js` podría quedar así:

```javascript
import { User, userRepository } from '../models/users';

const UserController = {

    todosLosUsuarios : (req, res) => {
        res.json(userRepository.findAll());
    },

    usuarioPorId : (req, res) => {
        let user = userRepository.findById(req.params.id);
        if (user != undefined) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
        
    },

    me : (req, res) => {
        res.json(req.context.me);
    },

    nuevoUsuario : (req, res) => {
        let usuarioCreado = userRepository.create(new User(undefined, req.body.username));
        res.status(201).json(usuarioCreado);
    },

    editarUsuario: (req, res) => {
        let usuarioModificado = userRepository.updateById(req.params.id, new User(undefined, req.body.username));
        if (usuarioModificado == undefined)
            res.sendStatus(404);
        else   
            res.status(200).json(usuarioModificado);
    },

    eliminarUsuario: (req, res) => {
        userRepository.delete(req.params.id);
        res.sendStatus(204);
    }


};



export  {
    UserController
}
```

- Como podemos comprobar, en la primera línea importamos la clase `User` y el `userRepository`, en lugar de obtenerlo desde el contexto. Es otra manera diferente e igualmente válida de hacerlo.
- Se añaden los métodos `nuevoUsuario`, `editarUsuario` y `eliminarUsuario` para implementar dichas peticiones, y siguiendo las indicaciones de la tabla anterior.


## 5.4 Ahora, sí, añadimos los cambios al router

Una vez definidos los nuevos métodos (middlware) controladores los añadimos al router, que quedaría así:

```javascript
import { Router } from 'express';

import { UserController } from '../controllers/user';

const router = Router();

router.get('/', UserController.todosLosUsuarios)

router.get('/me', UserController.me);

router.get('/:id', UserController.usuarioPorId);

router.post('/', UserController.nuevoUsuario);

router.put('/:id', UserController.editarUsuario);

router.delete('/:id', UserController.eliminarUsuario);

export default router;
```

Dado que ya teníamos vinculado el router a nuestra app, no tenemos más que iniciarla para comprobar que las nuevas funcionalidades están operativas.



# Bibliografía

1. Documentación de Express.js


