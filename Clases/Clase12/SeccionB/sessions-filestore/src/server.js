import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileStrategy from "session-file-store";

const app = express();
app.listen(8080,()=>console.log("server listening on port 8080"));

app.use(cookieParser());
const FileStore = fileStrategy(session); // vinculacion del storage de archivos con las sesiones.

app.use(session({
    //configurar la memoria para guardar las diferentes sesiones
    store: new FileStore({
        path:"./src/sessions",
        ttl:3600 //el tiempo maximo de la sesion seran 20 segundos.
    }),
    //clave para encriptar los sessionId
    secret:"claveUltraSecreta",
    //indicacion de almacenamiento externo de las sesiones
    resave:false,
    saveUninitialized:false
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