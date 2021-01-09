
# 09 Mongoose (1ª Parte)

> En este ejemplo volvemos a utilizar como base el ejemplo 6

## 1. Introducción

Mongoose es un framework de Javascript que se usa normalmente junto a Node.js y Express para conectar con una base de datos de MongoDB. 

Se trata de un ODM (_Object Document Mapper_). Esto significa que Mongoose permite definir objetos con un esquema **fuertemente tipado** que se asigna a un documento MongoDB. Estos tipos vienen definidos por un `SchemaType`.

Los tipos más usuales son:

- `String` (Cadena)
- `Number` (Número)
- `Date` (Fecha)
- `Buffer`
- `Boolean` (Booleano)
- `Mixed` (Mixto)
- `ObjectId`
- `Array` (Matriz)

A través de diversos plugins se puede extender la cantidad de tipos.

Cada tipo de datos nos permite especificar:

- un valor predeterminado
- una función de validación personalizada
- indica que se requiere un campo
- una función get que nos permite manipular los datos antes de que se devuelvan como un objeto
- una función de conjunto que nos permite manipular los datos antes de guardarlos en la base de datos
- crear índices para permitir que los datos se obtengan más rápido
- ...

Además de estas opciones comunes, ciertos tipos de datos nos permiten personalizar aún más cómo se almacenan y recuperan los datos de la base de datos. Por ejemplo, un tipo de datos `String` también  permite especificar las siguientes opciones adicionales:

- convertirlo a minúsculas
- convertirlo a mayúsculas
- recortar datos antes de guardar
- una expresión regular que puede limitar los datos que se pueden guardar durante el proceso de validación
- una enumeración que puede definir una lista de cadenas que son válidas

Las propiedades `Number` y `Date` son compatibles con la especificación de un valor mínimo y máximo permitido para ese campo.

La mayoría de los ocho tipos de datos permitidos deberían sernos familiares. Sin embargo, hay varias excepciones, como `Buffer`, `Mixed`, `ObjectId` y `Array`.

El tipo de datos `Buffer` permite guardar datos binarios. Un ejemplo común de datos binarios sería una imagen o un archivo codificado, como un documento PDF.

> Recuerda que MongoDB impone que como tamaño máximo de documento el valor de 16Mb. Si se tiene intención de guardar ficheros pequeños, `Buffer` puede ser adecuado; si no se sabe de antemano el tamaño de ficheros, quizás no sea un tipo adecuado, y deberíamos plantearnos trabajar con [GridFS](https://docs.mongodb.com/manual/core/gridfs/)

El tipo de datos `Mixed` convierte la propiedad en un campo "todo vale". Este campo se parece a cuántos desarrolladores pueden usar MongoDB porque no hay una estructura definida. Ten cuidado con el uso de este tipo de datos ya que pierde muchas de las excelentes funciones que ofrece Mongoose, como la validación de datos y la detección de cambios de entidades para saber automáticamente si desea actualizar la propiedad al guardar.

El tipo de datos `ObjectId` comúnmente especifica un enlace a otro documento en nuestra base de datos. Por ejemplo, si temos una colección de libros y autores, el documento del libro puede contener una propiedad `ObjectId` que hace referencia al autor específico del documento.

El tipo de datos `Array` permite almacenar arrays como los de JavaScript. Con un tipo de datos `Array`, podemos realizar operaciones típicas de un array de JavaScript como `push`, `pop`, `shift`, `slice`, etc.

## 2. Pasos a seguir

Si queremos trabajar con Mongoose en nuestra aplicación, tendremos que seguir estos pasos _genéricos_.

1. Instalar la librería de Mongoose
2. Configuración de Mongoose.
3. Definir un esquema
4. Trabajar con los modelos.

Vamos a añadir estas funcionalidades a nuestra aplicación de ejemplo.

### 2.1 Instalación y configuración de la librería Mongoose.

Este es posiblemente el paso más sencillo de todos. Para instalar la librería Mongoose, hacemos lo mismo que con otras librerías:

```bash
npm i --save mongoose
```

Una vez hecha la instalación, allá donde queramos utilizar mongoose tendremos que importar la librería y conectar con nuestro servidor de base de datos.

> En este caso, vamos a conectar con una instancia local de MongoDB.

```javascript
import mongoose from "mongoose"

// Resto del código.

// Inicialización del servidor y conexión a base de datos

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
  if (err) {
    console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
  } else {
    console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
    app.listen(process.env.PORT, () =>
      console.log(
        `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
      )
    );
  }

});
```

Reformulamos nuestro código para que primero conecte a la base de datos y, si la conexión tiene éxito, después arranque la aplicación de express. En caso de error de conexión a la bases de datos, lanzamos un mensaje de error y no iniciamos la aplicación.

> La URI de conexión a la base de datos está definida como una variable de entorno<br/>
> ```env
> DB_URI=mongodb://localhost/mongoose
> ```

> Tienes mucha más información sobre cómo conectar desde Mongoose a MongoDB en la documentación oficial: [https://mongoosejs.com/docs/connections.html](https://mongoosejs.com/docs/connections.html)


### 2.2 Definir un esquema

Todo en Mongoose comienza con un esquema. Cada esquema se asigna a una colección de MongoDB y define la forma de los documentos dentro de esa colección.

Para definir un esquema tendríamos que seguir los siguientes pasos.

> Este es el ejemplo de la documentación oficial

```javascript
import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    title:  String, // String es un atajo para {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
});
```

Un documento JSON de ejemplo para este esquema podría ser:

```json
{
    title: "Introducción al uso de Mongoose en aplicaciones de Node.js",
    author: "Luis Miguel López Magaña",
    body: "Lorem ipsum dolor sit amet....",
    comments: [
        {
            body: "Gran artículo",
            date: ISODate("2020-11-11T01:00:00+01:00"),
        },
        {
            body: "He llorado de emoción al leerlo",
            date: ISODate("2020-11-11T01:00:00+01:00"),
        }
    ],
    hidden: false,
    meta: {
        votes: 15,
        favs: 27
    }
}
```

Cada clave de nuestro `blogSchema` define una propiedad en nuestros documentos que se convertirá en su `SchemaType` asociado. Por ejemplo, hemos definido una propiedad `title` que se convertirá en `String` y una propiedad date que se convertirá en `Date`.

> Ten en cuenta que si una propiedad sólo require del tipo, se puede utilizar el atajo. Por ejemplo, `String` es el atajo para `{ type: String }`.

A las claves también se les pueden asignar objetos anidados que contegan más definiciones de clave/tipo como la propiedad `meta`. Esto nos permite anidar un documento como parte de otro documento.

Los esquemas no solamente definen la estructura de nuestros documentos y los tipos de datos de cada propiedad, sino que definen una serie de métodos de instancia, métodos estáticos a nivel de modelo, índices, y métodos para gestionar el ciclo de vida.

> Tenemos herramientas que nos ayudan a generar un Schema de Mongoose a partir de un documento JSON. Una de ellas es [https://transform.tools/json-to-mongoose](https://transform.tools/json-to-mongoose).

#### 2.2.1 Ids

Por defecto, Mongoose añade una propiedad `_id`, de tipo `ObjectId` a nuestros esquemas.

> También se puede sobrescribir el `_id` predeterminado de Mongoose con uno propio. Solo hay que tener cuidado, ya que Mongoose se negará a guardar un documento que no tenga un `_id`, por lo que somos responsables de configurar el `_id` si lo definimos nosotros mismos.


### 2.3 Trabajar con Modelos

Para usar nuestra definición de esquema, necesitamos transformar dicho esquema en un `Model`. Para hacer esto, utilizamos la función `mongoose.model`:

```javascript
// mongoose.model(modelName, schema)
const Blog = mongoose.model('Blog', blogSchema);
```

El primer argumento es el nombre en singular del modelo, y el segundo es el esquema sobre el que definimos este modelo.

#### 2.3.1 Instanciando documentos

Una instancia de un modelo se llama **documento**. Crearlo y guardarlo en la base de datos es sencillo.

> Si quieres conocer la diferencia entre modelo y documento, puedes echar un vistazo a este enlace [https://mongoosejs.com/docs/documents.html#documents-vs-models](https://mongoosejs.com/docs/documents.html#documents-vs-models).

```javascript
const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', schema);

const small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // insertado!
});

// o

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // insertado!
});

// o, para insertar muchos documentos a la vez.
Tank.insertMany([{ size: 'small' }], function(err) {

});
```

#### 2.3.2 Consultas

Encontrar documentos es fácil con Mongoose, que admite la rica sintaxis de consulta de MongoDB. Los modelos de mongoose ofrecen muchas funciones estáticas para realizar las operaciones CRUD. Todas ellas devuleven un objeto de tipo [`Query`](https://mongoosejs.com/docs/api.html#Query).

- `Model.deleteMany()`
- `Model.deleteOne()`
- `Model.find()`
- `Model.findById()`
- `Model.findByIdAndDelete()`
- `Model.findByIdAndRemove()`
- `Model.findByIdAndUpdate()`
- `Model.findOne()`
- `Model.findOneAndDelete()`
- `Model.findOneAndRemove()`
- `Model.findOneAndReplace()`
- `Model.findOneAndUpdate()`
- `Model.replaceOne()`
- `Model.updateMany()`
- `Model.updateOne()`

Una consulta de Mongoose se puede ejecutar de varias formas:

- O bien, pasando como argumento una función callback, de forma que ejecutará la consulta de forma asíncrona, y proporcionará el resultado a dicho callback.
- O bien, ejecutando el método `.then()`, para ser usada así como una promesa
- Por último, podemos usar `async/await` con el método `.exec()` de `Query`.

Para ejecutar una consulta usando un callback, podemos proporcionar varios argumentos. Por ejemplo, para métodos como `findOne`:

- Un primero objeto Javascript, que incluya las condiciones (tal y como haríamos en MongoDB)
- Una cadena de caracteres, que incluya una lista separada por espacios de los campos que queremos obtener
- La función callback, que recibe un (posible) error `err`, así como el resultado `person` de la consulta

```javascript
const Person = mongoose.model('Person', yourSchema);

// find one person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', (err, person) => {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".
  console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation);
});
```

Mongoose ha ejecutado la consulta y ha pasado el resultado a la función callback. Todos los callbacks en Mongoose tienen la estructura `callback(error, result)`.

Si no le proporcionarmos un callback, la función `findOne` (así como el resto de funciones de consulta) devuelven un objeto `Query`.

```javascript
// find one person with a last name matching 'Ghost'
const query = Person.findOne({ 'name.last': 'Ghost' });

// selecting the `name` and `occupation` fields
query.select('name occupation');

// execute the query at a later time
query.exec(function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host."
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});
```

## 3. ¡Vamos al código!

Como hemos visto anteriormente, tenemos que:

1. Instalar mongoose.

```bash
npm i --save mongoose
```

2. Realizar la conexión a la instancia de MongoDB que corresponda, configurando la URL de conexión como una variable de entorno.

En el fichero `.env` añade una variable para la conexión. Podría ser como esta:

```
DB_URI=mongodb://localhost/mongoose
```

Posteriormente, una versión inicial del código de conexión a MongoDB podría incluirse en el fichero `src/index.js`, siendo el siguiente:

```javascript
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
  if (err) {
    console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
  } else {
    console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
    app.listen(process.env.PORT, () =>
      console.log(
        `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
      )
    );
  }

});

```

> Sería bueno sacar este código a un fichero independiente, aplicando toda la configuración que corresponda, y posteriormente importarlo en `src/index.js`.

3. Definir nuestros esquemas y modelos.

En este ejemplo partimos del código del ejemplo 6, así que el modelo que vamos a implementar sería el de la clase `User`.

### 3.1 Definición del esquema

Nos dirijimos al fichero `src/models/users.js` para hacer los cambios pertinentes.

En primer lugar, **ya no vamos a poder utilizar nuestra clase User** para representar nuestro modelo. Como hemos visto anteriomente, **tenemos que definir un esquema** y sobre este **crear nuestro modelo para poder crear documentos**. `Schema`, `Model` y `Document` son _clases_ de Javascript de las que no vamos a heredar.

```javascript
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String
});

const User = mongoose.model('User', userSchema);

/*class User {

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
*/
```

Como podemos observar, el código de la clase `User` así como el array que estábamos usando como almacén de datos ya no nos sirven, y lo podemos comentar (o eliminar).

### 3.2 Cambios en los métodos del repositorio

Parece lógico pensar que también tendremos que hacer cambios en los métodos de nuestro repositorio, que pasan de trabajar con un array a trabajar con nuestro modelo `User`.

```javascript
const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;

}
```

Esta función, que se utiliza en la validación, debe buscar ahora a través de Mongoose. Con el método `countDocuments` podemos contar el número de documentos que cumplen una determinada condición. De esta forma, podemos saber si un email existe o no.

> Como podemos observar, para refactorizar los métodos que teníamos antes, de forma que un método que realiza una consulta devuelva un resultado, usamos promesas y `async/await`.

> Si `result > 0` es verdadero, se devuelve `true`, y si no, `false`.

```javascript
const userRepository = {

    // Devuelve todos los usuarios del repositorio
    async findAll() {
        const result =  await User.find({}).exec();
        return result;
    },
    // Devuelve un usuario por su Id
    async findById(id) {
       const result = await User.findById(id).exec();
       return result != null ? result : undefined;
    },
    // Inserta un nuevo usuario y devuelve el usuario insertado
    async create(newUser) {
        const theUser = new User({
            username : newUser.username,
            email: newUser.email
        });
        const result = await theUser.save();
        return result; // Posiblemente aquí nos interese implementar un DTO

    },
    // Actualiza un usuario identificado por su ID
    async updateById(id, modifiedUser) {

        const userSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;
    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    async delete(id) {
        await User.findByIdAndRemove(id).exec();
    }

}
```

- Para el método `findAll()` los cambios son sencillos. Buscamos todos los documentos a través del método `User.find` y los devolvemos. Si no hay ninguno, se devuelve un array vacío
- En el caso del método `findByid()`, hacemos uso del método `User.findById`. Este método devuleve `null`, y nosotros anteriormente devolvíamos `undefined` si no encontrábamos el usuario con dicho id. Hacemos la comprobación oportuna para devolver el valor adecuado.
- Para el método `createUser` usamos el método `save()`.
- Quizás el método que más cambia es `updateById`. En este caso, primero buscamos el usuario por el id. Si no lo encontramos, devolvemos `undefined`. En otro caso, utilizamos el método `Object.assign` para asignar los valores de `modifiedUser` al usuario que acabamos de leer de la base de datos. De esta forma, aquellos nuevos valores que proporciona `modifiedUser` se sobreescribirán, pero si algun valor no cambia o incluso no se proporciona en `modifiedUser`, se mantendrá el valor antiguo.
- El método `delete` hace uso de `findIdAndRemove` para eliminar usando el id.

### 3.3 Cambios en el controlador y el enrutador

Los cambios realizados anteriormente tienen leves impactos en el controlador, que tenemos que ajustar. El principal es el hecho de tener que usar `async/await` para utilizar los métodos del repositorio que hemos refactorizado en el apartado anterior.

`src/controllers/user.js`

```javascript
const UserController = {

    todosLosUsuarios: async (req, res) => {
        const data = await userRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    usuarioPorId: async (req, res) => {

            let user = await userRepository.findById(req.params.id);
            if (user != undefined) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }

    },


    nuevoUsuario: async (req, res) => {
        // let usuarioCreado = userRepository.create(new User(req.body.username, req.body.email));
        // Ya no tenemos la clase user para usarla así, tenemos que crear un simple objeto
        let usuarioCreado = await userRepository.create({
            username: req.body.username,
            email: req.body.email
        })
        res.status(201).json(usuarioCreado);
    },

    editarUsuario: async (req, res) => {
        // let usuarioModificado = userRepository.updateById(req.params.id, new User(undefined, req.body.username));
        // Ya no tenemos la clase user para usarla así, tenemos que crear un simple objeto
        let usuarioModificado = await userRepository.updateById(req.params.id, {
            username: req.body.username
        });
        if (usuarioModificado == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(usuarioModificado);
    },

    eliminarUsuario: async (req, res) => {
        await userRepository.delete(req.params.id);
        res.sendStatus(204);
    }


};
```

En el caso del enrutador, también tenemos que hacer algunos pequeños cambios.

- En la validación, no podemos forzar a que el id sea un entero, ya que se trata de un valor tipo `ObjectId`.
- La función de validación `emailExists` también se debe llamar con `async/await`.

```javascript
router.get('/:id', 
    /*[
        param('id').isInt().withMessage('ID debe ser un número entero')
    ],
    validar,*/
    UserController.usuarioPorId);

router.post('/', [
        body('username').isLength({min: 5}).withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
        body('email')
            .isEmail()
            .withMessage('El campo email debe ser un email válido')
            .custom(async email => {
                if(await emailExists(email)) {
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

Por último, ajustamos el fichero `src/index.js`:


```javascript
app.use((req, res, next) => {
  // Para cualquier petición, añadimos en su contexto
  req.context = {
    // Todos los modelos
    models,
    // El "usuario actual". Ahora mismo simula que hayamos hecho un login
    // Más adelante, lo podremos conseguir de otra forma.
    // me: models.users.userRepository.findById(1)
  };
  next();
});
```

## 4. Posibles mejoras

La aplicación en este punto, es funcional, y podemos realizar las operaciones CRUD sobre los usuarios. ¿Qué mejoras podemos incluir?

- Los modelos de Mongoose se pueden extender, añadiendo funciones. Podríamos agregar algunas, por ejemplo para transformar a DTO.
- Otra posible mejora podría ser añadir algunas consultas más, en base a algunos parámetros que el cliente proporcione: buscar por email, por nombre de usuario, ...
- Nuestro modelo de datos es extremadamente simple. Sin embargo, las aplicaciones reales tendrán varios modelos que, posiblemente, estarán relacionados entre ellos, obligándonos a hacer consultas más complejas.
- Por último, hasta ahora hemos añadido validación a nivel de los controladores. Mongoose también nos permite establecer validación a nivel de los modelos. Tendríamos que plantearnos unificar todas las validaciones y gestión de errores de la aplicación.
- Como añadido, la integración con la seguridad JWT. 


# Lectura complementaria

El siguiente enlace es una guía para la implementación de modelos con Mongoose siguiendo determinadas reglas de estilos, como la estructura de carpetas, la del esquema, el uso del singular, manejo de errores, ...

[https://github.com/Zwimber/mongoose-style-guide](https://github.com/Zwimber/mongoose-style-guide)


# Bibliografía

1. https://code.tutsplus.com/es/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527
2. Documentación oficial de Mongoose

