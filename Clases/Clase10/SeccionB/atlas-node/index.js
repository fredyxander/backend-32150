import mongoose from "mongoose";
import { userModel } from "./models/user.js";

const URL ="mongodb+srv://fredy:coder@coderbackend32150.wnvbmke.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, error=>{
    if(error) throw new Error(`connection failed ${error}`);
    console.log("conexion exitosa")
})

const operaciones = async()=>{
    //insert
    const newUsers = [
        { nombre: 'Lucas', apellido: 'Blanco', dni: '30355874' },
        { nombre: 'María', apellido: 'García', dni: '29575148' },
        { nombre: 'Tomas', apellido: 'Sierra', dni: '38654790' },
        { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }
    ];
    let result = await userModel.insertMany(newUsers);
    console.log(result);
}
operaciones()
