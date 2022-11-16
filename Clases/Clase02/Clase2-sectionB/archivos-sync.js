const fs = require("fs");

//crear un archivo
fs.writeFileSync("./archivo.txt", "primer texto")

//leer archivo
const contenido = fs.readFileSync("./archivo.txt" ,"utf-8")
console.log(contenido)

//agregar contenido
fs.appendFileSync("./archivo.txt", "\ninfo adicional")

//eliminar el archivo
// fs.unlinkSync("./archivo.txt")

try {
    fs.unlinkSync("./archivo.doc")
} catch (error) {
    console.log(error)
}
console.log("otras instrucciones")