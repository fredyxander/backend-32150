const express = require("express");
const router = express.Router();

const fruits = [
    {id:1, name:"pera", price:200},
    {id:2, name:"manzana", price:100},
    {id:3, name:"sandia", price:300},
]

router.get("/", (request, response)=>{
    if(Object.keys(request.query).length>0){
        // console.log("request", request.query)
        const {name} = request.query;
        const newFruits = fruits.filter(elm=>elm.name === name);
        response.send(newFruits);
    } else {
        response.send(fruits);
    }
});

// http://localhost:8080/fruits/2
//ruta url params o parametros de identificacion.
router.get("/:fruitId", (req,res)=>{
    const {fruitId} = req.params;
    const product = fruits.find(elm=>elm.id === parseInt(fruitId));
    res.send(product);
})

//peticion de tipo post, para guardar un elemento
router.post("/",(req,res)=>{
    const newFruit = req.body;
    fruits.push(newFruit);
    res.send(fruits)
})

//actualizacionde tipo put
router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const modification = req.body;
    console.log(id, modification);
    const fruitPos = fruits.findIndex(elm=>elm.id === parseInt(id));
    if(fruitPos>=0){
        //modificamos el elemnto.
        fruits[fruitPos] = modification;
        res.status(200).send(fruits)
    } else{
        res.status(404).send("El elemento no se encontro")
    }
})

router.get("/peras",(req,res)=>{
    //listado de peras.
})

module.exports = router;