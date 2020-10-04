/*
    Ejemplos extraídos del curso de Openwebinars.net Javascript para principiantes
    https://github.com/OpenWebinarsNet/curso-de-javascript-principiantes/blob/master/03.Strings/00_material.html
*/ 

// concatenar texto
console.log('Hello ' + 'World')
// template literals
const name = 'Cristina'
console.log(`Hello ${name} whatever`)
// typeof
console.log(typeof name)
// .length
console.log(name.length)
// .includes()
console.log(name.includes('asdfasdf'))
// .slice(start, end)
console.log(name.slice(2, 5))
// .replace(‘este texto', ‘por este otro’)
console.log(name.replace('na', 'asdfas'))
// .trim()
const text = '   as dfas a asdfasd a    '
console.log(text.trim())
// .split(‘,’)
const geolocation = 'Calle whatever. 7. 1D'
console.log(geolocation.split('.'))