import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.listen(8080,()=>console.log("server listening on port 8080"));

app.use(cookieParser("claveUltraSecreta")); //le estamos indicamos al servidor que utilice cookies.

app.get("/set-cookie1",(req,res)=>{
    res.cookie("galleta1","oreo").send("cookie1 creada");
});

//crear una cookie con un tiempo de vida de 5 segundos
app.get("/set-cookie2",(req,res)=>{
    res.cookie("galleta2","ritz",{
        maxAge: 5000
    }).send("cookie2 creada")
});

//leer cookies
app.get("/get-cookies",(req,res)=>{
    const cookies = req.cookies;
    res.send(cookies);
});

app.get("/delete-cookie",(req,res)=>{
    res.clearCookie("galleta1").send("cookie1 eliminada")
});

app.get("/login",(req,res)=>{
    res.cookie("loginInfo",{name:"pepito", role:"lector"}, {signed:true}).send("sesion iniciada")
})

app.get("/cookie-signed",(req,res)=>{
    res.send(req.signedCookies);
})