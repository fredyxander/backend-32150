const fs = require("fs");

try {
    const fecha = new Date().toLocaleDateString();

    fs.writeFileSync("./fyh.txt", fecha);
    const contenido = fs.readFileSync("./fyh.txt", "utf-8");
    console.log(contenido)

} catch (error) {
    console.log(error)
}