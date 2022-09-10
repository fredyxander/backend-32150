class Contador{
    constructor(nombre){
        this.nombre = nombre;
        this.contadorIndividual = 0;
    }

    //propiedad de la clase, que es compartida por todos los objetos
    static contadorGlobal = 0;

    obtenerResponsable (){
        return this.nombre;
    }

    obtenerCuentaIndividual (){
        return this.contadorIndividual;
    }

    obtenerCuentaGlobal (){
        return Contador.contadorGlobal;
    }

    contar (){
        this.contadorIndividual++;
        Contador.contadorGlobal++;
    }
}

const contadorMaria = new Contador("maria");
console.log("maria", contadorMaria);
const contadorPedro = new Contador("pedro");
console.log("pedro", contadorPedro);

console.log(contadorMaria.obtenerResponsable())

console.log(contadorMaria.obtenerCuentaIndividual())
console.log(contadorMaria.obtenerCuentaGlobal())

contadorMaria.contar();
contadorPedro.contar();
contadorPedro.contar();
console.log(contadorMaria.obtenerCuentaIndividual())
console.log(contadorPedro.obtenerCuentaIndividual())
console.log(contadorMaria.obtenerCuentaGlobal())