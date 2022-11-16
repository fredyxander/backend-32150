import {options} from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);


database.from("cars").where("id",5).update({price:2000, name:"mazda"})
.then(()=>console.log("register updated"))
.catch(err=>console.log(err))
.finally(()=>database.destroy());