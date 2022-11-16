const numeros = [];
const resultados ={};
for (let index = 0; index < 10000; index++) {
    const numeroAleatorio = parseInt(Math.random()*20+1);//18
    if(resultados[numeroAleatorio]){
        resultados[numeroAleatorio]++
    } else{
        resultados[numeroAleatorio] = 1;
    }
}
console.log(resultados)

// resultados.propiedad
// resultados["propiedad"]

//resultado
// {
//     12:150,
//     5: 80,
//     16:900
// }

//pruebas de escritorio
// {
//     18:2,
//     10:1
// }