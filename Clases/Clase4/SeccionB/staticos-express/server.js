const express = require("express");
const fruitRouter = require("./routes/fruits");
const {userRouter} = require("./routes/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//archivos estaticos
app.use("/archivos",express.static(__dirname + "/public"));
app.use("/documentos",express.static("documents"));

app.listen(8080,()=>console.log("server is listening on port 8080"))

app.use("/fruits", fruitRouter);
app.use("/users",userRouter);
