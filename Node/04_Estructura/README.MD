

Pasos iniciales descritos en los ejemplos anteriores

npm init -y
instalar nodemon
instalar y configurar babel
instalar dotenv
instalar express
instalar cors
instalar body-parser



A partir de aquí:

instalar algunas librerías como

morgan
morgan-body

Crear la estructura de directorios

models (que son nuestros modelos + repositorios)
routes
services
middlewares

En cada uno de ellos tenemos un index.js que importa todo lo necesario dentro del directorio, y posteriormente lo exporta, exponiéndolo de una forma uniforme.

Posteriormente podremos añadir algunos más para

configuración
seguridad
utilidades
....

