import {options} from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

const coches = [
    {name:"Volvo", price:2300},
    {name:"Audi", price:5300},
    {name:"Toyota", price:3300},
    {name:"Mercedez", price:1300},
    {name:"porshe", price:4590},
    {name:"ford", price:4520},
]

//INSERT
//agregamos el arreglo de coches a la tabla 'cars'
database('cars').insert(coches)
.then(()=>console.log("data added"))
.catch(err=>console.log(err))
.finally(()=>database.destroy());
