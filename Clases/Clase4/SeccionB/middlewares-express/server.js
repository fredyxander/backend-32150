const express = require("express");
const app = express();
const PORT = 8081;
app.listen(PORT,()=>console.log("server running"));

app.use(express.json());

app.use((req,res,next)=>{
    console.log("procesando antes de la peticion");
    next();
})

const rol = "student";

const verificarRol = (req,res,next)=>{
    if(rol === "admin"){
        next();
    } else{
        res.send("no tienes acceso a esta ruta")
    }
}

//routes
app.get("/",(req,res)=>{
    console.log("ejecutando ruta /")
    res.send("peticion recibida")
})

app.get("/home", verificarRol,(req,res)=>{
    console.log("ejecutando ruta /home")
    res.send("peticion recibida en ruta home")
})

app.get("/users",verificarRol,(req,res)=>{
    res.send("lista de usuarios")
})