import admin from "firebase-admin";
import {readFileSync} from "fs";
const serviceAccount = JSON.parse(readFileSync("./firebaseKey.json"));
// console.log(serviceAccount);

//inicializamos firebase.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://backendcoder32150.firebaseio.com",
});
console.log("base conectada");

const operacionesCRUD = async()=>{
    //generar una instancia de la base de datos
    const db = admin.firestore();
    //definir coleccion
    const userCollection = db.collection("usuarios");

    //guardar un documento.
    const doc = userCollection.doc();
    // await doc.create({nombre:"pepito", edad:28});
    // console.log("user created");

    //guardar varios documentos.
    // let batch = db.batch();
    // const usuarios = [
    //     { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
    //     { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
    //     { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
    // ];
    // usuarios.forEach(usuario=>{
    //     const docRef = db.collection("usuarios").doc(); //creamos como una instancia del doc que vamos aguardar.
    //     batch.set(docRef, usuario)
    // });
    // await batch.commit(); //ejecutamos el batch con las multiples operaciones.

    //read
    // let response = await userCollection.get();
    // let docs = response.docs; //los documentos de la coleccion users.
    // let users = docs.map(doc=>({
    //     id:doc.id,
    //     nombre: doc.data().nombre,
    //     edad:doc.data().edad
    // }));
    // console.log(users)

    //update
    // const docId ="UCSu6XsMeuOkmUCcsAmG";
    // const refDoc = db.collection("usuarios").doc(docId);
    // await refDoc.update({edad:23});

    //delete
    const docId ="UCSu6XsMeuOkmUCcsAmG";
    const refDoc = db.collection("usuarios").doc(docId);
    await refDoc.delete();
}

operacionesCRUD();