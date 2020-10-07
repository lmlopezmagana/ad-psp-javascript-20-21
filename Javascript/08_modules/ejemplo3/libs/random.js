
// Generate random integer between min,max both included
function getRndInteger(max,min) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndInteger1and10() {
    return getRndInteger(1,10);
}

function getRndInteger1and100() {
    return getRndInteger(1,100);
}


export default getRndInteger

export { getRndInteger1and10, getRndInteger1and100 }