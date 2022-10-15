const express = require("express");
const {Server} = require("socket.io");

const app = express();

//crea el servidor de express y lo coloca a funcionar en un puerto
const server = app.listen(8080,()=>console.log("listening on port 8080"));

//io: servidor del websocket
const io = new Server(server); //conectamos con el servidor principal.

app.use(express.static(__dirname+"/public"));

//crear la conexion del socket del cliente con el socket del servidor.
io.on("connection",(socket)=>{
    console.log("nuevo socket o cliente conectado", socket.id);
    //enviar informacion del lado del servidor al cliente.
    socket.emit("messageFromServer","se ha conectado exitosamente")

    socket.on("letras",(dataDelCliente)=>{
        console.log(dataDelCliente)
            //emitir informacion para todos los sockets conectados
            io.sockets.emit("messages",dataDelCliente);
    })
})