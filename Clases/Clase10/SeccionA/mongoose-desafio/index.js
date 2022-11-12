import mongoose from "mongoose";
import { studentModel } from "./models/student.js";

//LA URL donde se esta ejcutando nuestra base de datos
const URL ="mongodb://127.0.0.1/colegio";

//conectamos a la base de datos
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error=>{
    if(error) throw new Error(`Conexion fallida ${error}`);
    console.log("conexion base de datos exitosa!")
})

const operacionesCRUD = async()=>{
    try {
        const newStudents = [
            { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
            { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
            { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
            { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
            { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
            { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
            { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
            { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
            { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
            { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
        ]

        //Guardar los estudiantes.
        // let result = await studentModel.insertMany(newStudents);
        // console.log(result)

        // //guarda un solo documento
        // let result = await studentModel.create({nombre:"Pepe"});
        // console.log(result);

        //Read de la colleccion estudiantes
        // let students = await studentModel.find().sort({nombre:1});
        // console.log(students)

        //2. El estudiante más joven.
        // const younger = await studentModel.find({},{nombre:1, edad:1, _id:0}).sort({edad:1}).limit(1)
        // console.log(younger)

        //Los estudiantes que pertenezcan al curso '2A'
        // let result = await studentModel.find({curso:"2A"},{nombre:1, curso:1, _id:0})
        // console.log(result)

        //El segundo estudiante más joven.
        // const younger2 = await studentModel.find({},{nombre:1, edad:1, _id:0}).sort({edad:1}).limit(1).skip(1);
        // console.log(younger2)

        //Los estudiantes que sacaron 10.
        // const studentsNote10 = await studentModel.find({nota:10},{nombre:1, nota:1, _id:0});
        // console.log(studentsNote10)

        //El promedio de notas del total de alumnos.
        //agregacion.
        // const result = await studentModel.aggregate(
        //     [
        //         //agrupar a todos los estudiantes en un solo.
        //         {
        //             $group:{
        //                 //defino las propiedades de cada grupo
        //                 _id: "todos",
        //                 promedio:{$avg:"$nota"}
        //             }
        //         }
        //     ]
        // );
        // console.log(result);

        //El promedio de notas del curso '1A'.
        // const result = await studentModel.aggregate(
        //     [
        //         //agrupar los estudiantes por el curso
        //         {
        //             $group:{
        //                 _id:"$curso",
        //                 promedio:{$avg:"$nota"}
        //             }
        //         },
        //         //filtrar el grupo donde el curso ="1A"
        //         {
        //             $match:{
        //                 _id:"1A"
        //             }
        //         }
        //     ]
        // );
        // console.log(result)

        //Actualizar el dni del estudiante Lucas Blanco a 20355875
        // let studentUpdated = await studentModel.updateOne({nombre:"Lucas", apellido:"Blanco"}, {$set:{dni:"20355875"}});
        // console.log(studentUpdated);

        //Agregar un campo 'ingreso' a todos los documentos con el valor false
        // let result = await studentModel.updateMany({},{$set:{ingreso:false}});
        // console.log(result);

        //Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A
        // let result = await studentModel.updateMany({curso:"1A"},{$set:{ingreso:true}});
        // console.log(result)

        //Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true
        // let result = await studentModel.deleteMany({ingreso:true});
        // console.log(result)

        let result = await studentModel.create({ nombre: 'William', apellido: 'Gallo', edad: 25, dni: '10000', curso: '3B', nota: 2 });
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}
operacionesCRUD();