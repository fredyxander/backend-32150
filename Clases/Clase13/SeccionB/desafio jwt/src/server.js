const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();;

app.listen(8080,()=>{
    console.log("listening on  port 8080")
})

const publicPath = path.join(__dirname,"..","public");
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let users = [];

//routes
app.get('/',(req,res)=>{
    res.sendFile(publicPath+'/index.html')
})

app.get('/signup',(req,res)=>{
    res.sendFile(publicPath+'/signup.html')
})

app.get('/login',(req,res)=>{
    res.sendFile(publicPath+'/login.html')
})

app.get('/profile',(req,res)=>{
    res.sendFile(publicPath+'/profile.html')
})

app.post('/signup', (req,res)=>{
    const {username, password} = req.body;
    const userFound = users.find(el=>el.username === username);
    if(userFound){
        res.status(400).json({message:"Este usuario ya existe"})
    } else{
        console.log('username', username, 'pass', password)
        if(username && password){
            const newUser = req.body;
            newUser.id = users.length;
            users.push(newUser);
            jwt.sign({user: newUser},'claveDeCifrado',(err,token)=>{
                res.status(200).json({token: token, username: username})
            })
        } else {
            res.status(400).json({message:"Usuario no registrado"})
        }
    }
})

app.post('/login',(req,res)=>{
    const {username, password} = req.body;
    const userFound = users.find(el=>el.username === username);
    if(!userFound){
        res.status(400).json({message:"Este usuario no esta registrado"})
    } else{
        if(userFound.password === password){
            jwt.sign({user: userFound}, 'claveDeCifrado', (err,token)=>{
                res.status(200).json({token: token, username: username})
            })
        } else {
            res.status(400).json({message:"credenciales invalidas"})
        }
    }
})

const verifyToken = (req,res,next)=>{
    const headerToken = req.headers['authorization'];
    if(typeof(headerToken) !== "undefined"){
        const bearerToken = headerToken.split(' ')[1];
        req.token = bearerToken;
        next();
    } else{
        res.status(400);
    }
}

app.get('/data',verifyToken,(req,res)=>{
    jwt.verify(req.token,'claveDeCifrado',(err,data)=>{
        if(err) return res.status(403).json({message:"not authorized"})
        res.status(200).json({user:data})
    })
})