import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import Redis from "ioredis";
import redisStrategy from "connect-redis";

const app = express();
app.listen(8080,()=>console.log("server listening on port 8080"));

app.use(cookieParser());

const RedisStore = redisStrategy(session);

//creamos el cliente para conectarnos a redislabs
const redisClient = new Redis({
    host: 'redis-13262.c98.us-east-1-4.ec2.cloud.redislabs.com',
    port: 13262,
    password: 'iFTnXSiBVn2j8eRjcF5X2Fdvz51f39rT'
});

app.use(session({
    //configurar la memoria para guardar las diferentes sesiones en redis labs
    store: new RedisStore({
        client: redisClient,
        ttl:20
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

app.get("/create-key",(req,res)=>{
    redisClient.set("usuario1","fredy",(err,reply)=>{
        console.log(reply);
        redisClient.get("usuario1",(error,reply)=>{
            res.send(reply)
        })
    })
});

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("sesion finalizada")
});