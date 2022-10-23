const express = require('express');
const {productsRouter, products} = require('./routes/products');
const handlebars = require('express-handlebars');
const {Server} = require("socket.io");
const Contenedor = require("./managers/contenedorProductos");

//service
const productosApi = new Contenedor("productos.txt");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

// routes
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/productos',(req,res)=>{
    res.render('products',{products: products})
})

app.use('/api/products',productsRouter)

const server = app.listen(8080,()=>{
    console.log('running on port 8080')
})

const io = new Server(server);

//configuracion websocket
io.on("connection",async(socket)=>{
    //envio de los productos al socket que se conecta.
    io.sockets.emit("products", await productosApi.getAll())

    //recibimos el producto nuevo del cliente y lo guardamos con filesystem
    socket.on("newProduct",async(data)=>{
        await productosApi.save(data);
        //despues de guardar un nuevo producto, enviamos el listado de productos actualizado a todos los sockets conectados
        io.sockets.emit("products", await productosApi.getAll())
    })
})