import express from "express";
import {faker} from "@faker-js/faker";
const {name, internet, datatype} = faker;
faker.locale = "es";

const app = express();

app.listen(8080,()=>console.log("server running"));

app.get("/test",(req,res)=>{
    let arrayUsers=[];
    for(let i=0;i<100;i++){
        arrayUsers.push(
            {
                id: datatype.uuid(),
                nombre: name.firstName(),
                apellido: name.lastName(),
                color: internet.color()
            }
        )
    }
    res.send(arrayUsers);
})
