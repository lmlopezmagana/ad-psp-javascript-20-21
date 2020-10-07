
class Person {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
    }

    greeting() {
        return `Hola ${this.nombre} ${this.apellidos}`;
    }

    // mayor de 18 años
    isAdult() {
        return this.edad >= 18;
    }

}

export { Person }