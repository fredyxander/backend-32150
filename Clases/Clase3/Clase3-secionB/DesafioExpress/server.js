const express = require("express");

//crear el servidor
const app = express();

//configurar las rutas
app.get("/", (request, response)=>{
    response.send("<h1 style='color:blue'>Bienvenidos al servidor express</h1>")
})

let visitas = 0;
app.get("/visitas", (req,res)=>{
    visitas++;
    res.send(`La cantidad de visitas es ${visitas}`)
})

app.get("/fredy", (req,res)=>{
    res.send("Hola fredy")
})

//levantar el servidor
app.listen(8080,()=>{
    console.log("server listening on port 8080")
})