
// ./libs/maths.js

export function suma(a,b) { 
    return a + b;
}

export const PI = 3.141593;


export function Punto(x, y) {
    this.x = x;
    this.y = y;
    this.distancia = function(otro) {
        return Math.sqrt((otro.x - this.x)**2 + (otro.y - this.y)**2);
    }
}
