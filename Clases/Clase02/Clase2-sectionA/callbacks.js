const sumar = (num1,num2)=>num1+num2;
const multiplicar = (num1,num2)=>num1*num2;
const division =(num1,num2)=>num1/num2;

const funcionPrincipal = (numero1, numero2, callback)=>{
    //otro codigo
    return callback(numero1, numero2)
}

console.log(funcionPrincipal(2, 4,sumar));
console.log(funcionPrincipal(2, 4,multiplicar));
console.log(funcionPrincipal(2, 4,division));


//callback para procesos pesados o ocmplejos
const notificacion = ()=> console.log("el proceso ya termino");

const funcionCompleja = (callback)=>{
    setTimeout(() => {
        //ejcutando muchas operaciones
        callback();
    }, 5000);
}

console.log(funcionCompleja(notificacion));
console.log("otro codigo")
