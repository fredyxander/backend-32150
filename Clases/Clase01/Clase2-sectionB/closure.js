// const ahorrosBanco = (abono)=>{
//     let ahorros = 0;
//     ahorros = ahorros + abono;
//     console.log(ahorros)
// }

// ahorrosBanco(500);
// ahorrosBanco(500);
// ahorrosBanco(500);

const ahorrosBanco = ()=>{
    let ahorros = 0;
    return function(abono){
        ahorros = ahorros + abono;
        return ahorros;
    }
}

let ahorrosPedro = ahorrosBanco();
let ahorrosMaria = ahorrosBanco();

ahorrosPedro(500);
ahorrosPedro(500);

ahorrosMaria(1000);
const dineroMaria = ahorrosMaria(1000);
console.log("dineroMaria: ",{name:"maria", dineroAhorrado: dineroMaria})
ahorrosPedro(500);

