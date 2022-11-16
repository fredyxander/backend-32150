const express = require("express");

//crear el servidor
const app = express();

//configurar las rutas
app.get("/", (request, response)=>{
    response.send("hola desde express")
})

app.get("/otra-ruta", (request, response)=>{
    response.send("Esta es otra ruta")
})

//levantar el servidor
app.listen(8080,()=>{
    console.log("server listening on port 8080")
})