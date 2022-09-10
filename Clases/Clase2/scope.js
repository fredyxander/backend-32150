//scope global
// let variableGlobal = "texto";

// function miFuncion(){
//     console.log(variableGlobal)
// }
// miFuncion();
// console.log(variableGlobal)

//scope local
function otraFuncion(){
    let variableLocal ="local";
    console.log(variableLocal);
}
otraFuncion()

if(true){
    let otraVariable = "otra";
    console.log(otraVariable);
}