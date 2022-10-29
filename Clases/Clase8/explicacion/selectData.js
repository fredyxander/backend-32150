import {options} from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

//SELECT * FROM cars;
database.from('cars').select("*")
.then((result)=>{
    const coches = result.map(elm=>({...elm}));
    console.log(coches);
})
.catch(err=>console.log(err))
.finally(()=>database.destroy());

//SELECT * FROM cars WHERE price>2000;
// database.from('cars').select("*").where("price",">",2000)
// .then((result)=>{
//     const coches = result.map(elm=>({...elm}));
//     console.log(coches);
// })
// .catch(err=>console.log(err))
// .finally(()=>database.destroy());