const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

console.log(__dirname)
const folderViews = path.join(__dirname, "views");
console.log(folderViews)

const app = express();
app.listen(8080,()=>console.log("server ready 8080"));

//configurar nuestro motor de plantillas para express

//1. definir el motor de plantillas
//          extension,  ejecutar el motor
app.engine("handlebars",handlebars.engine());

//2. ubicar la carpeta donde coloco los templates de ext .handlebars
//        "views",ruta de los templates
app.set("views", folderViews);

//3. definir el motor para express
//      "view engine", motor a utilizar
app.set("view engine", "handlebars");

//RUTAS
app.get("/",(req,res)=>{
    res.render("home",{
        nombre: 'Pablo',
        apellido: 'Lozano',
        edad: 25,
        email: '...',
        telefono: '...'
    })
})

app.get("/contacto",(req,res)=>{
    res.render("contact")
})

app.get("/usuarios",(req,res)=>{
    res.render("usuarios",{
        estudiantes:[
            {name:"pedro"},
            {name:"maria"},
            {name:"carlos"}
        ],
        name:"ana"
    })
})