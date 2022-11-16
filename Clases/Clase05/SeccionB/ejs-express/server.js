const express = require("express");
const app = express();
app.listen(8080,()=>console.log("server listening"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuramos el motor de plantillas
app.set("views", "./views");
app.set("view engine", "ejs");

const usuarios = [];

app.get("/",(req,res)=>{
    res.render("home",{
        users:usuarios
    })
})

app.post("/users", (req,res)=>{
    const newUser = req.body;
    usuarios.push(newUser);
    console.log(usuarios)
    res.redirect("/")
})