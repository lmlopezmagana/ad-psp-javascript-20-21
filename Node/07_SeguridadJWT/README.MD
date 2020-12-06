
# 07 Seguridad con JWT

> Este ejemplo está basado en el trabajo de David Poza que puedes consultar aquí: [https://davidinformatico.com/jwt-express-js-passport/](https://davidinformatico.com/jwt-express-js-passport/)

Vamos a ver cómo funcionan los sistemas de autenticación basados en tokens (objetos que almacenan las credenciales de acceso de un usuario), en concreto el estándar JWT, que es el acrónimo de JSON Web Token, un método de autenticación basado en JSON y que se representa como una cadena de texto, que debemos incluir en cada petición (diría que casi obligatoriamente `https`) a nuestra API para que pueda identificar qué usuario está realizándola y qué permisos tiene. Se ha popularizado mucho en los últimos años debido a las SPA (*Single page application*), el IoT (*internet of things*) y las apps de dispositivos móviles.

> Recuerda lo que ya sabes de seguridad en la web. Está basada siempre en dos procesos: la **autenticación** y la **autorización**. Con JWT vamos a realizar el primero de ellos. La autorización la podremos configurar después a través de (como casi todo en Express.js) _middlewares_.

## 7.1 Introducción y estructura

**¿Qué es un JSON Web Token?**

JWT es un estándar RFC 7519 para transmitir información con la identidad y _claims_ de un usuario de forma segura entre un cliente/servidor. Dicha información puede ser verificada y confiable porque está firmada digitalmente.

Como siempre, estas definiciones, cuando hablamos de conceptos técnicos son muy ambiguas y confunden más que ayuda a entenderlo.

A mi me gusta ir directo al grano, un JWT es "simplemente" una cadena de texto que tiene 3 partes codificadas en Base64, separadas por un punto (header.payload.firma) que generamos y entregamos a los clientes de nuestra API:

![Estructura de un token jwt](jwt_estructura.jpg)

> La codificación **Base64** se llama así porque genera una cadena ascii para representar cualquier dato binario, usando para ello un alfabeto de 64 caracteres. La versión URL elimina del alfabeto los caracteres “=”, “/” y “+”.

Es importante aclarar que la cadena/token esta codificado y lo crea nuestra aplicación, esto nos permite de manera muy fácil inspeccionar su contenido, por ejemplo con: [JWT Debugger](https://jwt.io/).

Por ejemplo, si usamos el siguiente token:

```jwt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9. TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

en JWT Debugger, obtenemos el siguiente resultado:

![Resultado de depurar un token con JWT Debugger](jwt-debugger.jpg)

**Pero, puedo ver el contenido. ¿Esto es seguro?**

Esta es la pregunta que todos nos hacemos la primera vez, hemos dicho que un JWT tiene 3 partes y esta codificado en Base64. Vamos a verlo:

- `HEADER`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`: Indica el algoritmo y tipo de Token, en nuestro caso: `HS256` y `JWT`.
- `PAYLOAD`: `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9`: datos de usuario/_claims_, fecha creación/caducidad Token y lo que necesite nuestra API para validar la petición. El estándar define unos cuantos posibles:
    - `sub`: identificador del usuario
    - `iat`: timestamp del momento de creación.
    - `exp`: timestamp en segundos a partir del cual el token dejará de ser válido. Es importante, desde el punto de vista de la seguridad, generar tokens con caducidad.
> En el payload podemos incluir campos personalizados, aquellos que usemos frecuentemente y nos ahorren peticiones contra la base de datos por ejemplo. Uno típico podría ser el nivel de privilegios que tiene el usuario. La “necesidad” es usar https es obvia, ya que el payload (datos sensibles), está simplemente codificado en base64 y cualquiera que intercepte el token podrá ver su contenido.
- `SIGNATURE`: `TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ` (la firma, para verificar que el token es válido, aqui lo importante es el **"secret"** con el que firmamos y que ahora explicaremos).

Asi que la respuesta es: "Sí, es totalmente seguro", porque como vemos en la imagen anterior, se indica **"Signature Verified"**: esto quiere decir que la firma se usa para verificar que el remitente del JWT es quien dice ser y para asegurarse de que el mensaje no haya cambiado en el camino.

Expliquemos con algo más de detalle la firma. Como decíamos al principio, *"la información puede ser verificada y confiable porque está firmada digitalmente"*, con un `secret-key`. Lo importante aquí es el `secret-key` para generar la firma del token, por supuesto, no hace falta decir que nuestro `secret-key` nunca se lo daremos a nadie.

Veamos el ejemplo en el JWT Debugger cambiando "`secret`" por "`otro-secret`" en el editor y pasará lo que se muestra en la imagen.

![Resultado del cambio del "secret" en la firma](./jwt-debugger2.jpg)

En este caso, al cambiar el "secret-key", vemos que la firma no es válida "Invalid Signature". Esto quiere decir que no podemos confiar en el Token JWT, porque que alguien lo puede haber firmado de forma maliciosa o cambiado algo del payload.

Por supuesto, será responsibilidad de nuestra aplicación cuando recibamos un Token en nuestra API, verificarlo con nuestro "secret-key", garantizar que la firma es válida para aceptarlo o denegarlo y eso lo tenemos que programar o usar alguna libreria ya disponible.

A nivel de algoritmos, podemos utilizar los siguientes con JWT:


- `HS256`: El el algoritmo usado por defecto, que consiste en un cifrado de clave simétrica HMAC (necesita una clave o SECRET para realizar el cifrado) con el algoritmo de hash SHA-256 (que produce una salida de 256 bits).
- `HS512`: cifrado de clave simétrica HMAC (necesita una clave o SECRET para realizar el cifrado) con el algoritmo de hash SHA-512 (que produce una salida de 512 bits).
- `RS256`: cifrado de clave simétrica RSASSA-PKCS1-v1_5 con el algoritmo de hash SHA-256. NOTA: Los cifrados asimétricos son interesantes en aplicaciones desacopladas, donde podemos tener la clave privada en el servidor y la clave pública en el cliente, por ejemplo.
- `RS512`: cifrado de clave asimétrica RSASSA-PKCS1-v1_5 con el algoritmo de hash SHA-512.
- `PS256`: cifrado de clave asimétrica RSASSA-PSS con el algoritmo de hash SHA-256. Este es el reemplazo de RSA-PKCS
- `PS512`: cifrado de clave asimétrica RSASSA-PSS con el algoritmo de hash SHA-512.
- `ES256`: cifrado de clave asimétrica ECDSA con el algoritmo de hash SHA-256. ECDSA utiliza claves más pequeñas y es más eficiente que RSA, Actualmente es el algoritmo que usan las criptomonedas Bitcoin y Ethereum, por ejemplo.
- `ES512`: cifrado de clave asimétrica ECDSA con el algoritmo de hash SHA-512.

> SHA significa **Secure Hash Algorithm** y a día de hoy SHA256 y SHA512 (Ambos de la familia SHA-2), siguen sin ser quebrantados, a diferencia de SHA-1. Además ya existe SHA-3, que sigue un enfoque diferente a la anterior versión y que aún no se sabe si es mejor ni si será su reemplazo en el futuro.

Si queremos información más técnica y detallada, leer esto: https://jwt.io/introduction


## 7.2 Ciclo de vida de un Token

Ahora que ya sabemos qué es JWT, vamos a dar un paso más allá y a conocer como funciona el proceso completo con un diagrama de uso:

![Ciclo de vida de un token JWT](jwt-workflow.png)

El proceso completo del JWT consta de estos pasos:

1. El usuario de una aplicacion web/móvil/desktop hace login con sus credenciales en el servidor donde esta publicada el API.
2. El usuario es validado en el servidor y se crea un nuevo Token JWT (usando nuestro "secret-key") para entregárselo al usuario.
3. El servidor retorna el JWT firmado que contiene los datos/claims referentes al usuario y caducidad del Token.
4. El cliente/browser almacena el JWT para su uso y lo envia en cada petición mediante "Authorization: Bearer ".
5. El servidor verifica la firma del Token, su caducidad y comprueba si usuario tiene permisos al recurso leyendo los datos del payload.
6. El servidor responde al cliente la petición una vez ha confirmado el Token y los permisos del usuario son correctos.

Comentarios sobre el ciclo de vida del JWT:

- `"Authorization: Bearer "`, es la forma más común, indicar que existen otras técnicas para hacerlo.
- JWT es muy ligero: podemos codificar gran cantidad de datos sensibles en el payload y pasarlo como una cadena.
- Creamos servicios de autenticación optimizados desacoplados del servidor y tenemos protección contra ataques CSRF.
- Nos ahorramos mantener el estado del usuario en el servidor y lo delegamos al cliente.
- Recordar que siempre, siempre, siempre debemos usar HTTPS entre el cliente/servidor para las peticiones.
- Y lo más importante: ¡Nos olvidamos de cookies!

> Los ataques CSRF realizan peticiones falseadas desde un servidor a otro de forma oculta dentro del html, que ha sido manipulado para ello. De modo que no es necesario robar la cookie para poder llevar a cabo acciones sobre el backend usando los privilegios del propietario de la misma.

Observando el ciclo de vida de JWT, vemos que la ventaja fundamental de este modelo de seguridad, es que, en lugar de almacenar información relacionada con la autorización vinculada a cada usuario en sesión del servidor, se almacena una sola clave de firma ("secret-key") en el servidor que sirve para crear los Tokens.

## 7.3 Usando la librería `passport`

Passport es una librería Javascript tremendamente popular, que mediante diferentes módulos extra, implementa lo que denomina “estrategias” para dotar a nuestra aplicación de capacidad de autenticación mediante diversos sistemas (JWT, OAuth, Google, Facebook, Twitter, Github, hasta un total de 502 estrategias).

### 7.3.1 Dependencias

Para este ejemplo vamos a usar los siguientes paquetes:

- `dotenv`: para parsear el fichero .env independientemente del sistema operativo. En este fichero guardaremos la configuración de bd y del algoritmo de encriptación de jwt.
- `express`: este ejemplo de api se basará en este microframework.
- `passport`: es la popular librería base para implementar un sistema de autenticación.
- `passport-local`: nos permite crear middleware passport con estrategia de tipo local.
- `passport-jwt`: nos permite crear middleware passport con estrategia de tipo jwt, que permitirá recibir un token vía cabecera y hacer su validación.
- `jsonwebtoken`: Es una librería que nos permite la creación de tokens jwt. 

## 7.4 Endpoints necesarios para la autenticación

Necesitamos añadir un par de endpoints para realizar dos procesos importantes: el registro de usuarios y el login.

> ¡OJO! Lo ideal para este ejemplo sería conocer ya cómo interactura con una base de datos. Lo seguiremos simulando en un repositorio en memoria, y lo modifiaremos cuando sepamos usar mongoose.

En el caso del registro lo ubicaremos en `/auth/register` (petición POST), y realizará los siguientes pasos.

1. Comprobar que el username no existe (podemos hacerlo a través de la propia validación).
2. En caso de que no haya problema, lo almacenamos en el repositorio, encriptando la contraseña con bcrypt.
3. Si hay algún tipo de error, lo devolvemos.

El login lo ubicaremos en la ruta `/auth/login` (petición POST), y realizará los siguiente pasos:

1. Usando la estrategia local de passport, verificamos los datos de usuario, indicando que no queremos sesiones (esto es algo propio de JWT, que es una estrategia _sessionless_).
2. Una vez que tenemos el resultado de la verificación, comprobamos si hubo errores y lo devolvemos.
3. Si no hubo errores, creamos el _payload_ del token, y lo firmamos usando el _header_, _payload_ y el _secret_ (que anteriormente hemos tenido que definir en nuestro fichero `.env`).
4. Devolvemos el token creado dentro de un JSON.

Hemos hablado de la estrategia local de passport y la verificación del usuario, pero, ¿cómo haremos esto? ¿qué pasos seguiremos?. La estrategia local se define a través de un objeto de tipo `LocalStrategy`, al cual asociaremos un callback de verificación con estos pasos:

1. Recibimos un objeto que incluya los campos `username` y `password`. 
2. Comprobamos que el `username` existe, y además, comprobamos que la `password` que hemos recibido, tras cifrarla, coincide con la password ya cifrada que tiene almacenada el usuario.
3. Llamamos a la función `done(err,data)` con el resultado obtenido. 
   1. Si no encontramos el usuario, devolvemos `data=false`. 
   2. Si encontramos el usuario pero sus passwords no coinciden, devolvemos `data=false`.
   3. Capturamos errores y los devolvemos con `done`.
   4. En cualquier otro caso, todo ha ido bien y capturamos los datos del usuario con `data=datos_usuario`.
   5. Devolvemos dichos datos.

> Más adelante veremos todo lo necesario para el proceso de autorización, incluyendo la autenticación basada en Token haciendo uso de la estrategia JwtStrategy.

## 7.5 ¡Vamos al código!

Después de tanta teoría, vayamos al código.

Comenzamos instalando todas las dependencias:

```bash
npm i --save passport passport-jwt passport-local jsonwebtoken bcryptjs
```

Continuamos añadiendo todas las variables de entorno necesarias en el fichero `.env`:

```properties
# Secreto para la encriptación
JWT_SECRET=esteEsElSecretoMásSecretoDeTodosLosSecretos

# Número de rondas utiliadas para el algoritmo de hashing de la contraseña
BCRYPT_ROUNDS=12

# Vida del token en segundos
JWT_LIFETIME=86400

# Algoritmo utilizado para el cifrado del token
JWT_ALGORITHM=HS256
```

Una vez hecho esto, vamos a definir una estructura para el uso de passport:

- Hacemos algunas modificaciones en el modelo de usuarios.
- Creamos una carpeta dentro de `src/services` que llamaremos `passport` (`src/services/passport`). Dentro añadiremos la configuración de las diferentes estrategias de passport a utilizar en la aplicación.
- Creamos un nuevo fichero en `src/routes` para la autenticación.
- También reamos un nuevo fichero en `src/controllers` para los controladores de login y registro.

## 7.5.1 Cambios en el modelo

Realizamos algunos cambios para dar soporte a la autenticación

- Añadimos el campos password al modelo de usuario
- Añadimos una contraseña cifrada a los usuarios de ejemplo
- Para ellos, necesitamos importar la librería bcrypt y las variables de entorno

```javascript
import 'dotenv/config';
import bcrypt from 'bcryptjs';

class User {
    // modificamos el constructor, dejando el id al final para hacerlo optativo
    constructor(username, email, password, id=0) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

const password = bcrypt.hashSync('12345678', process.env.BCRYPT_ROUNDS);

let users = [
    new User('Luis Miguel López', 'luismi@email.com', password,  1),
    new User('Ángel Naranjo', 'angel@email.com', password, 2)
];
```

Nótese como se incluye la misma contraseña a todos los usuarios por ser un ejemplo.

Posteriormente, añadimos un par de métodos:

- Uno que nos sirve para verificar si un `username` ya está insertado en la colección de usuarios, y otro para encontrar a un usuario por su nombre de usuario.

```javascript
const usernameExists = (username) => {
    let usernames = users.map(user => user.username);
    return usernames.includes(username);
}

const userRepository = {
    // Resto de métodos

    // Encuentra un usuario por su username
    findByUsername(username) {
       let result = users.filter(user => user.username == username);
       return Array.isArray(result) && result.length > 0 ? result[0] : undefined;   
    },
    // Resto de métodos
}
```

> Como es lógico, todo esto será sustituido por consultas a la base de datos cuando trabajemos con Mongoose.

### 7.5.2 Servicio para passport

Vamos a inaugurar la carpeta `src/services/passport` creando un fichero `index.js` con toda la configuración y lógica de passport, que posteriormente importaremos desde el fichero principal y que asociaremos a nuestra aplicación.

En primer lugar definimos la estrategia local. Esta estrategia de passport sirve para autenticar a un usuario utilizando su nombre de usuario y contraseña. Comprueba en el almacén (repositorio, base de datos, ...) si el ususario existe y las constraseñas coinciden y, en tal caso, da por autenticado al usuario.

La forma de crear y configurar una estrategia es a través del método `passport.use(...)`. En este caso usamos la versión que agrega un nombre a la estrategia:

```javascript
passport.use('password', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
}, (username, password, done)=>{
    //callback de verificación
}));
```

Indicamos los nombres de los campos usuario y contraseña, así como que no queremos usar sesiones. Posteriormente, vamos a configurar el callback de verificación, que recibe el nombre de usuario, la contraseña, y la función `done` que nos permite confirmar positiva o negativamente la autenticación.

```javascript
import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User, userRepository } from '../../models/users';
import bcrypt from 'bcryptjs';


passport.use('password', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
},(username, password, done)=> {
    const user = userRepository.findByUsername(username);
    if (user == undefined)
        return done(null, false); // El usuario no existe
    else if (!bcrypt.compareSync(password, user.password))
        return done(null, false); // No coincide la contraseña
    else
        return done(null, user);

}));
```

Ahora, debemos definir la estrategia para JWT. Para crear esta, necesitamos importarla y proporcionarle una serie de opciones, entre las que está el método que va a usar para extraer el token de una petición protegida con autenticación, el SECRET para el algoritmo y éste en sí. En nuestro caso, usaremos la opción más habitual, que es recoger el token de el campo `Authorization` de la cabecera de la petición. 

```javascript
/** config de estrategia jwt de passport ******/
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

passport.use('token', new JwtStrategy(opts, (jwt_payload, done)=>{

    // Extraemos el id del campo sub del payload
    const user_id = jwt_payload.sub;

    // Buscamos el usuario por ID
    const user = userRepository.findById(user_id);
    if (user == undefined)
        return done(null, false); // No existe el usuario
    else
        return done(null, user);

}));
```

Finalmente, no se nos debe olvidar exportar el objeto passport, para importarlo desde el fichero `src/index.js` e inicializarlo.

`src/services/passport/index.js`
```javascript
// Resto del código

export default passport;
```

`src/index.js`
```javascript
// Resto del código
import passport from './services/passport';
//...
// Inicialización de passport
app.use(passport.initialize());
```

### 7.5.3 Rutas y controladores

Ahora sí añadimos los endpoints para el registro y el login. Para ello creamos un nuevo controlador en `src/controllers/auth.js`.

El registro en nuestro caso es la parte más sencilla pues no necesitamos ni tan siquiera hacerlo pasar por el middleware de passport, pues los usuarios se registra contra una base de datos a la que tenemos acceso y podemos atacar directamente.

La única peculiaridad es que debemos comprobar si ya existe el usuario antes de intentar crearlo y que su password no la vamos a guardar en ningún caso como texto plano sino como un hash creado con un algoritmo llamado Blowfish, gracias a la librería bcrypt.

Si todo va bien, devolvemos el usuario sin la contraseña. Los errores los lanzaremos aquí mismo, si bien podemos refactorizar el código para procesarlos en un middleware especial.

```javascript
const AuthController = {

    register: (req, res, next) => {
        // ¿Realmente este método es necesario, o podríamos modificar la petición POST en /users?
        // Mantendremos solamente esta versión, que estará más actualizada
        
        // La comprobación de si el username o el email ya existe la realiza la validación
        // No es necesario hacer nada más aquí.


        let usuarioCreado = userRepository.create(
            new User(req.body.username, req.body.email, 
                        bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))));

        // Devolvemos todos los datos del usuario menos la contraseña                
        res.status(201).json({
            id: usuarioCreado.id,
            username: usuarioCreado.username,
            email: usuarioCreado.email
        });
    },
    login: (req, res, next) => {

    }


}
```


# Bibliografía

1. [https://davidinformatico.com/jwt-express-js-passport/](https://davidinformatico.com/jwt-express-js-passport/)
2. [https://davidinformatico.com/jwt-express-js-sin-passport/](https://davidinformatico.com/jwt-express-js-sin-passport/)
3. [https://enmilocalfunciona.io/construyendo-una-web-api-rest-segura-con-json-web-token-en-net-parte-i/](https://enmilocalfunciona.io/construyendo-una-web-api-rest-segura-con-json-web-token-en-net-parte-i/)