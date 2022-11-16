const express = require("express");
const {Server} = require("socket.io");
const Contenedor = require("./managers/contenedorProductos");

//servicios
const productsService = new Contenedor("productos.txt");

const app = express();

const PORT = process.env.PORT || 8080;

//servidor de express
const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);

//trabajar con archivos estaticos de la carpeta public
app.use(express.static(__dirname+"/public"));

const historicoMensajes = [];


//websocket
io.on("connection",async(socket)=>{
    console.log("nuevo usuario conectado", socket.id);

    //enviar todos los productos al usuario cuando se conecte.
    socket.emit("products", await productsService.getAll())

    //recibimos el nuevo producto del cliente y lo guardamos
    socket.on("newProduct",async(data)=>{
        await productsService.save(data);
        //enviamos la lista de productos actualizada a todos los sockets conectados
        io.sockets.emit("products", await productsService.getAll());
    })

    //enviar a todos menos al socket conectado
    socket.broadcast.emit("newUser");

    //se envia al cliente cuando se conecta
    socket.emit("historico",historicoMensajes);

    //recibir el evento message de un cliente
    socket.on("message",data=>{
        console.log(data);
        historicoMensajes.push(data);
        //enviar a todos
        io.sockets.emit("historico",historicoMensajes);
    });
})