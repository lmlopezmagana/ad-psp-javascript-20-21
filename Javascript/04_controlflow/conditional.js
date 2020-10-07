
//let numero = 10;
let numero = 50;

if (numero < 50) {
    console.log(`El número ${numero} es menor que 50`);
} else  {
    console.log(`El número ${numero} es mayor o igual que 50`);
}


//let tipoFruta = "Fresas";
let tipoFruta = "Manzanas";


switch (tipoFruta) {
  case "Naranjas":
    console.log("Naranjas cuestan 0,59€ el kilo.");
    break;
  case "Manzanas":
    console.log("Manzanas cuestan 0,32€ el kilo.");
    break;
  case "Plátanos":
    console.log("Plátanos cuestan 0,48€ el kilo.");
    break;
  case "Cerezas":
    console.log("Cerezas cuestan 3,00€ el kilo.");
    break;
  case "Mangos":
    console.log("Mangos cuestan 0,56€ el kilo.");
    break;
  case "Papayas":
    console.log("Mangos y papayas cuestan 2,79€ el kilo.");
    break;
  default:
   console.log("Disculpa, no tenemos el tipo de fruta " + tipoFruta + ".");
}
console.log("¿Te gustaría tomar algo?");