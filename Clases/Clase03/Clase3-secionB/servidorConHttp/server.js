const http = require("http");

//crear el servidor usando el modulo http
const server = http.createServer((request, response)=>{
    console.log("el cliente solicito algo");
    response.end("Hola desde el servidor http, recibi tu solicitud")
})

//levantar o ejecutar el servidor
server.listen(8080, ()=>{
    console.log("server listening on port 8080")
});