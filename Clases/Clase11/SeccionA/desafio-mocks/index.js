import express from "express";
const app = express();
const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana','Pedro'];
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei'];
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta'];

app.listen(8080,()=>console.log("server running"));

app.get("/test",(req,res)=>{
    let arrayUsers=[];
    for(let i=0;i<100;i++){
        arrayUsers.push(
            {
                nombre: nombres[parseInt(Math.random()*nombres.length)],
                apellido: apellidos[parseInt(Math.random()*apellidos.length)],
                color: colores[parseInt(Math.random()*colores.length)]
            }
        )
    }
    res.send(arrayUsers);
})
