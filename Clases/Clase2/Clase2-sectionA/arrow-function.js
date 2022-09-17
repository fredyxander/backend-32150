//funcion declarativa
function sumar(num1,num2){
    // console.log(num1+num2);
    return num1+num2;
}
const resultado = sumar(2,6);
console.log("resultado", resultado+9)

//funcion tipo flecha
const sumar2 = (num1, num2)=>{
    const numero1 = num1*2;
    const numero2 = num2*2;
    return numero1+numero2;
}
const resultado2 = sumar2(5,8);
console.log("resultado2", resultado2)

//arrow function con un solo parametro
const multiplicar = num1=>{
    return num1*2;
}
const resultadoMult = multiplicar(5);
console.log("resultadoMult: ",resultadoMult)

//arrow function con una sola linea de codigo en el cuerpo de la funcion
const division = (num1, num2) => num1/num2;
const resultadoDivision = division(10,3);
console.log("resultadoDivision: ", resultadoDivision)