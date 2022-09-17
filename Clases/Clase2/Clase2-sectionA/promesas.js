// const division = (dividendo, divisor)=>{

// }

const promesa = new Promise((resolve, reject)=>{
    let condition = false;
    if(condition === true){
        resolve("operacion completada con exito")
    } else{
        //si hay algun fallo
        reject("Hubo un fallo en el servidor")
    }
})

promesa.then((resultado)=>console.log(resultado))
.catch(error=>console.log(error))