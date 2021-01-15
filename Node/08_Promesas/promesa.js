const fetch = require('node-fetch');
const fs = require('fs');
/*
fetch('https://jsonplaceholder.typicode.com/todos') 
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => alert(err))
*/
/*
const download = async () => {
    //const response = await fetch('https://jsonplaceholder.typicode.com/todo');
    try {
        const response = await fetch('https://asdf.com/todo');
        const json = await response.json();
        return json;
    
    } catch (err) {
        return {
            mensaje : "Error al descargar todo esto"
        }
    }
    
}

(async () => console.log(await download()))();*/

/*
let promise = new Promise((resolve, reject) => {

    let number = Math.floor(Math.random() * 100);

    if (number % 2 == 0)
        resolve(number);
    else
        reject(new Error("el número no es par"));

    //setTimeout(()=> resolve("1234"), 1000);

});


promise
    .finally(() => console.log("Esto se imprime siempre"))
    .then((val) => console.log(val))
    .catch((err) => console.log('¡Vaya! Se ha producido un error: ' + err));
*/



/*
let promise = fetch('file://mnt/c/Users/lmlopez/Desktop/nodejs/users.json');

console.log(promise);
*/
/*
readJsonFileAsync = function(filename) {
    return new Promise(function(resolve, reject) {
            fs.readFile(filename, function(err, data){
                if (err) 
                    reject(err); 
                else 
                    resolve(JSON.parse(data));
            });
        });
};


readJsonFileAsync('./users.json')
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(profile => fetch(profile.repos_url))
    .then(response => response.json())
    .then(repos => repos.map(r => r.full_name))
    .then(repos_names => console.log(repos_names))
    .catch(err => console.log(err));


async function f() {
    let data = await readJsonFileAsync('./users.json');
    console.log(data);
}

f();
//console.log(data);

const f2 = async (src) => {
    return await readJsonFileAsync(src)
};

f2('./users.jsona')
    .then(result => console.log(result))
    .catch(err => console.log(err));

*/

async function f3() {
    const users = ['lmlopezmagana', 'miguelcamposdev', 'qwerty1234' ]
    const requests = users.map(user => fetch(`https://api.github.com/users/${user}`))
    let responses = await Promise.all(requests)
    let profiles = await Promise.all(responses.map(response => response.json()))
    console.log(profiles);
}

f3();

