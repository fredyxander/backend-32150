const fs = require("fs");

//escribir archivo
fs.writeFile("./archivo-async.txt", "primer texto", (error)=>{
    if(error){
        console.log(error)
    } else{
        console.log("el archivo se creo correctamente")
    }
})

//leer archivo
fs.readFile("./archivo-async.txt","utf-8", (error, contenido)=>{
    if(error){
        console.log(error)
    } else{
        console.log(contenido)
    }
});

//eliminar el archivo
fs.unlink("./archivo-async.txt", (error)=>{
    if(error){
        console.log(error)
    } else{
        console.log("el archivo fue eliminado")
    }
})