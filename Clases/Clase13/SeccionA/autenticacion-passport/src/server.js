//importaciones
import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { dirname } from "path";
import {fileURLToPath} from "url";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local"; //estrategia para autenticar por correo y password.
import bcrypt from "bcrypt"; //encriptar las contrase;as
import mongoose from "mongoose"; //db usuarios
import MongoStore from "connect-mongo"; //store session
import {UserModel} from "./models/user.js";
import {Strategy as TwitterStrategy} from "passport-twitter";

//conectamos a la base de datos
const mongoUrl = "mongodb+srv://fredy:coder@coderbackend32150.wnvbmke.mongodb.net/authDB?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
},(error)=>{
    if(error) return console.log(`Hubo un error conectandose a la base ${error}`);
    console.log("conexion a la base de datos de manera exitosa")
});

//servidor express
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));


//archivos estaticos
const __dirname = dirname(fileURLToPath(import.meta.url)); //ruta server.js
app.use(express.static(__dirname+"/public"));//ruta carpeta public


//motor de plantilla
//inicializar el motor de plantillas
app.engine(".hbs",handlebars.engine({extname: '.hbs'}));
//ruta de las vistas
app.set("views", __dirname+"/views");
//vinculacion del motor a express
app.set("view engine", ".hbs");


//interpretacion de formato json desde el cliente
app.use(express.json()); //lectura de json desde el cuerpo de la peticion.
app.use(express.urlencoded({extended:true})); //lectura de json desde un metodo post de formulario

//configuracion de la sesion
app.use(session({
    //definimos el session store
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://fredy:coder@coderbackend32150.wnvbmke.mongodb.net/sessionsDB?retryWrites=true&w=majority"
    }),
    secret:"claveSecreta", //clave de encriptacion de la sesion

    //config para guardar en la memoria del servidor
    resave:false,
    saveUninitialized:false,
}));

//configurar passport
app.use(passport.initialize()); //conectamos a passport con express.
app.use(passport.session());//vinculacion entre passport y las sesiones de nuestros usuarios.

//serializar un usuario
passport.serializeUser((user,done)=>{
    done(null, user.id)
});

//deserializar al usuario
passport.deserializeUser((id,done)=>{
    //validar si el usuario existe en db.
    UserModel.findById(id,(err, userFound)=>{
        return done(err, userFound)
    })
});

//crear una funcion para encriptar la contrase;
// estaesmiPass => ahjsgduyqwte234296124ahsd-hash
const createHash = (password)=>{
    const hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    return hash;
}

//estrategia de registro utilizando passport local.
passport.use("signupStrategy", new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField: "email"
    },
    (req,username,password,done)=>{
        //logica para registrar al usuario
        //verificar si el usuario exitse en db
        UserModel.findOne({username:username},(error,userFound)=>{
            if(error) return done(error,null,{message:"Hubo un error"});
            if(userFound) return done(null,null,{message:"El usuario ya existe"});
            //guardamos el usuario en la db
            const newUser={
                name:req.body.name,
                username:username,
                password:createHash(password)
            };
            UserModel.create(newUser,(error,userCreated)=>{
                if(error) return done(error, null, {message:"Hubo un error al registrar el usuario"})
                return done(null,userCreated);
            })
        })
    }
));

//strategia para login atraves de twitter
passport.use("twitterLogin", new TwitterStrategy(
    {
        consumerKey:"7r3k8QTV0aOWvjlhHZM2PFmsV",
        consumerSecret:"CufkP4FjVUtTWZhYmQNVLfaqCdJQb9wlTQhjB7aZ2V7yms0ao2",
        callbackURL:"http://localhost:8080/auth/twitter/callback"
    },
    (token,accesToken,profile,done)=>{
        console.log("profile", profile);
        UserModel.findOne({username:profile.username},(error,userFound)=>{
            if(error) return done(error,null,{message:"Hubo un error"});
            if(userFound) return done(null,userFound);
            //guardamos el usuario en la db
            const newUser={
                name:profile.displayName,
                username: profile.username,
                password: profile.id
            };
            UserModel.create(newUser,(error,userCreated)=>{
                if(error) return done(error, null, {message:"Hubo un error al registrar el usuario"})
                return done(null,userCreated);
            })
        })
    }
));

//middleware para validar la sesion del usuario
// const checkSession = (req,res,next)=>{
//     //validamos si la sesion esta activa
//     if(req.session.user){
//         res.redirect("/perfil");
//     } else{
//         next();
//     }
// }


//rutas asociadas a las paginas del sitio web
app.get("/",(req,res)=>{
    res.render("home")
});

app.get("/registro",(req,res)=>{
    const errorMessage = req.session.messages ? req.session.messages[0] : '';
    res.render("signup", {error:errorMessage});
    req.session.messages = [];
});

app.get("/inicio-sesion",(req,res)=>{
    res.render("login")
});

app.get("/perfil",(req,res)=>{
    // res.render("profile");
    console.log(req.session)
    if(req.isAuthenticated()){
        res.render("profile");
    } else{
        res.send("<div>Debes <a href='/inicio-sesion'>inciar sesion</a> o <a href='/registro'>registrarte</a></div>")
    }
});


//rutas de autenticacion registro
app.post("/signup",passport.authenticate("signupStrategy",{
    failureRedirect:"/registro",
    failureMessage: true //req.sessions.messages.
}),(req,res)=>{
    res.redirect("/perfil")
});

//ruta de autenticacion login
app.post("/login",(req,res)=>{
    const user = req.body;
    //el usuario existe
    const userExists = users.find(elm=>elm.email === user.email);
    if(userExists){
        //validar la contrase;a
        if(userExists.password === user.password){
            req.session.user = user;
            res.redirect("/perfil")
        } else{
            res.redirect("/inicio-sesion")
        }
    } else{
        res.redirect("/registro");
    }
});

//login con twitter
app.get("/login-twitter", passport.authenticate("twitterLogin"));
app.get("/auth/twitter/callback", passport.authenticate("twitterLogin",{
    failureRedirect:"/login",
    failureMessage:true
}),(req,res)=>{
    res.redirect("/perfil")
})

//ruta de logout con passport
app.get("/logout",(req,res)=>{
    req.logout(err=>{
        if(err) return res.send("hubo un error al cerrar sesion")
        req.session.destroy();
        res.redirect("/")
    });
});