const express = require('express');

const router = express.Router();

let products = []

router.get('/',(req,res)=>{
    res.render('products',{products});
})

router.get('/:id',(req,res)=>{
    const productId = req.params.id;
    const product = products.find(item=>item.id === productId);
    console.log('product', product)
    if(product){
        return res.send(product)
    } else{
        return res.send({error : 'producto no encontrado'})
    }
})

router.post('/',(req,res)=>{
    let newProduct = req.body;
    console.log('newProduct',newProduct)
    if(products.length===0){
        newProduct.id = 1
    } else {
        newProduct.id = products.length+1;
    }
    products.push(newProduct);
    res.redirect('/');
})

router.put('/:id',(req,res)=>{
    const cambioObj = req.body;
    const productId = req.params.id;
    const productFound = products.find(item=>item.id == productId);
    const newObj = {...productFound, ...cambioObj};
    console.log('new', newObj)
    products[productId-1] = {...newObj};
    res.send(products);
})

router.delete('/:id',(req,res)=>{
    const productId = req.params.id;
    const newProducts = products.filter(item=>item.id !== parseInt(productId));
    products = newProducts;
    res.send(products);
})

module.exports = {productsRouter:router, products};