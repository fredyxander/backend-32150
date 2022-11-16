const express = require("express");
const fruitRouter = require("./routes/fruits");
const {userRouter} = require("./routes/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080,()=>console.log("server is listening on port 8080"))

app.use("/fruits", fruitRouter);
app.use("/users",userRouter);

//rutas ejemeplo
// http://localhost:8080/fruits/ =>obtener todos los productos.
// http://localhost:8080/fruits/2 =>obtener solo un producto.
// http://localhost:8080/fruits/peras
// http://localhost:8080/users/