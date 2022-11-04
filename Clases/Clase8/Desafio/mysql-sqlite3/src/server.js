const express = require('express');
const options = require("./config/dbConfig");
const {productsRouter, products} = require('./routes/products');
const handlebars = require('express-handlebars');
const {Server} = require("socket.io");
const Contenedor = require("./managers/contenedorProductos");
const ContenedorChat = require('./managers/contenedorChat');
const ContenedorSql = require("./managers/contenedorSql");

//service
// const productosApi = new Contenedor("productos.txt");
const productosApi = new ContenedorSql(options.mariaDB, "products");
// const chatApi = new ContenedorChat("chat.txt");
const chatApi = new ContenedorSql(options.sqliteDB,"chat");

//server
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

//configuracion template engine handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

// routes
//view routes
app.get('/', async(req,res)=>{
    res.render('home')
})

app.get('/productos',async(req,res)=>{
    res.render('products',{products: await productosApi.getAll()})
})

//api routes
app.use('/api/products',productsRouter)


//express server
const server = app.listen(8080,()=>{
    console.log('listening on port 8080')
})


//websocket server
const io = new Server(server);

//configuracion websocket
io.on("connection",async(socket)=>{
    //PRODUCTOS
    //envio de los productos al socket que se conecta.
    io.sockets.emit("products", await productosApi.getAll())

    //recibimos el producto nuevo del cliente y lo guardamos con filesystem
    socket.on("newProduct",async(data)=>{
        await productosApi.save(data);
        //despues de guardar un nuevo producto, enviamos el listado de productos actualizado a todos los sockets conectados
        io.sockets.emit("products", await productosApi.getAll())
    })

    //CHAT
    //Envio de todos los mensajes al socket que se conecta.
    io.sockets.emit("messages", await chatApi.getAll());

    //recibimos el mensaje del usuario y lo guardamos en el archivo chat.txt
    socket.on("newMessage",async(newMsg)=>{
        await chatApi.save(newMsg);
        io.sockets.emit("messages", await chatApi.getAll());
    })
})