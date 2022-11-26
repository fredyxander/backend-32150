import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
app.listen(8080,()=>console.log("server listening on port 8080"));

app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://fredy:coder@coderbackend32150.wnvbmke.mongodb.net/sessionsDB?retryWrites=true&w=majority"
    }),
    secret:"claveSecreta",
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge:20000
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

const checkUserLogged = (req,res,next)=>{
    if(req.session.username){
        next();
    } else{
        res.redirect("/login");
    }
}

app.get("/perfil",checkUserLogged,(req,res)=>{
    console.log(req.session);
    res.send(`Bienvenido ${req.session.username}`);
});

app.get("/home",checkUserLogged,(req,res)=>{
    console.log(req.session);
    res.send("home");
});


app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("sesion finalizada")
});