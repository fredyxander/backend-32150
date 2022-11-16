import express, {Request, Response} from "express";
import { getTime } from './utils/getTime';
import Person from "./managers/Person";
const app = express();

const usuario = new Person("Pablo","Caceres");

app.listen(8080,()=>console.log("server listening on port 8080"));

//ruta
app.get("/",(req:Request,res:Response)=>{
    res.send({
        time:getTime(),
        name:usuario.getFullName()
    })
})