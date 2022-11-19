class Calculadora{
    static sumar(a,b){
        if(!a || !b) return console.log("debes pasar dos argumentos");
        if(!Number.isInteger(a)) return console.log("El primer argumento debe ser un numero entero");
        if(!Number.isInteger(b)) return console.log("El segundo argumento debe ser un numero entero");
        console.log(a+b);
    }
}

Calculadora.sumar("asd",2);

// 1. posibles fallas o posibles validaciones
// que la funcion sumar sea un metodo dentro de un clase
// que el metodo sumar lo pueda ejecutar sin intanciar la clase.
// que el metodo sumar reciba dos parametros
// que los parametros sean de tipo numerico
// que la suma realice correctamente.
// que la funcion retorne un valor.