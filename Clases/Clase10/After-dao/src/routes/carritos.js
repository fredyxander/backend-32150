import express from "express";
import { options } from "../config/databaseConfig.js";
import { ContenedorArchivo } from "../managers/ContenedorArchivo.js";
import { ContenedorMysql } from "../managers/ContenedorMysql.js";
import {ContenedorDaoProductos, ContenedorDaoCarritos} from "../daos/index.js";

//manager carritos
// const productosApi = new ContenedorArchivo(options.fileSystem.pathProducts);
// const carritosApi = new ContenedorArchivo(options.fileSystem.pathCarts);
// const productosApi = new ContenedorMysql(options.sqliteDB, "productos");
// const carritosApi = new ContenedorMysql(options.sqliteDB, "carritos");
const productosApi = ContenedorDaoProductos;
const carritosApi = ContenedorDaoCarritos;

//router carritos
const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res) => {
    const response = await carritosApi.getAll();
    res.json(response);
})

cartsRouter.post('/', async (req, res) => {
    const response = await carritosApi.save({ products: [], timestamp: new Date().toLocaleDateString() });
    res.json(response);
})

cartsRouter.delete('/:id', async (req, res) => {
    const cartId = parseInt(req.params.id);
    res.json(await carritosApi.deleteById(cartId));
})

cartsRouter.get('/:id/productos', async (req, res) => {
    const cartId = parseInt(req.params.id);
    const carritoResponse = await carritosApi.getById(cartId);
    if(carritoResponse.error){
        res.json(carritoResponse);
    } else{
        const getData = async()=>{
            const products = await Promise.all(carritoResponse.message.products.map(async(element) => {
                const productResponse = await productosApi.getById(element);
                return productResponse.message
            }));
            res.json({products: products});
        }
        getData();
    }
})

cartsRouter.post('/:id/productos', async (req, res) => {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.body.id);
    const carritoResponse = await carritosApi.getById(cartId);
    if(carritoResponse.error){
        res.json({message:`El carrito con id: ${cartId} no fue encontrado`});
    } else{
        const productoResponse = await productosApi.getById(productId);
        if(productoResponse.error){
            res.json(productoResponse);
        } else{
            carritoResponse.message.products.push(productoResponse.message.id);
            const response = await carritosApi.updateById(carritoResponse.message, cartId);
            res.json({message:"product added"});
        }
    }
})

cartsRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.idProd);
    const carritoResponse = await carritosApi.getById(cartId);
    if(carritoResponse.error){
        res.json({message:`El carrito con id: ${cartId} no fue encontrado`});
    } else{
        const index = carritoResponse.message.products.findIndex(p => p === productId);
        if (index !== -1) {
            carritoResponse.message.products.splice(index, 1);
            await carritosApi.updateById(carritoResponse.message, cartId);
            res.json({message:"product deleted"});
        } else{
            res.json({message:`El producto no se encontro en el carrito: ${productId}`});
        }
    }
})

export {cartsRouter}