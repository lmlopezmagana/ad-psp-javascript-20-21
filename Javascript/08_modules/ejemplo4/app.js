
import { Person } from './model/person.js';

let person1 = new Person("Luis Miguel", "López Magaña", 38);

console.log(person1.greeting());

if(person1.isAdult()) {
    console.log("Tiene 18 años o más");
} else {
    console.log("Tiene menos de 18 años");
}