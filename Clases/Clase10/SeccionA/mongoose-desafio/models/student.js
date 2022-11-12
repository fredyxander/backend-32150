import mongoose from "mongoose";

const studentCollection = "estudiantes";

//creamos el esquema de los documentos estudiantes
const studentSchema = new mongoose.Schema(
    {
        // nombre: String
        nombre:{
            type: String,
            required: true
        },
        apellido:{
            type: String,
            required:true
        },
        edad:{
            type: Number,
            required: true
        },
        dni:{
            type: String,
            required: true,
            unique:true, //evitar duplicados
        },
        curso:{
            type: String,
            required:true
        },
        nota:{
            type: Number,
            required:true
        },
        ingreso:Boolean,
    }
);

//generar un modelo, que nos va a permitir operaciones sobre los documentos.
export const studentModel = mongoose.model(studentCollection, studentSchema);