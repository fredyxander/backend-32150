const promesa = new Promise((resolve, reject)=>{
    let condition = true;
    if(condition === true){
        resolve("operacion completada con exito")
    } else{
        //si hay algun fallo
        reject("Hubo un fallo en el servidor")
    }
})

// promesa.then((resultado)=>console.log(resultado))
// .catch(error=>console.log(error))

//async-await
const getData = async()=>{
    try {
        const resultado = await promesa;
    } catch (error) {
        console.log(error)
    }
}
