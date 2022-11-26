import express from "express";
import session from "express-session";

const app = express();
app.listen(8080,()=>console.log("listening on port 8080"));

app.use(session({
    //encriptar la informacion
    secret:"claveUltraSecreta",

    //indicamos donde se va a guardar la sesion. memoria del servidor
    resave: true,
    saveUninitialized: true,

    //definir los parametros de la cookie, por la cual viaja el sessionId.
    cookie:{
        maxAge:50000 //max 30seg
    }
}));

app.get("/login",(req,res)=>{
    const {user} = req.query;
    if(req.session.username){
        return res.redirect("/perfil")
    } else{
        if(user){
            req.session.username = user;
            res.send("sesion iniciada");
        } else{
            res.send("por favor ingresa el usuario")
        }
    }
});

app.get("/perfil",(req,res)=>{
    console.log(req.session);
    if(req.session.username){
        res.send(`Bienvenido ${req.session.username}`);
    } else{
        res.redirect("/login")
    }
});

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("sesion finalizada")
});