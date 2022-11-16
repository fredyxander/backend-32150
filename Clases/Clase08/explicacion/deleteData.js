import {options} from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

database.from("cars").where("id",4).del()
.then(()=>console.log("register deleted"))
.catch(err=>console.log(err))
.finally(()=>database.destroy());