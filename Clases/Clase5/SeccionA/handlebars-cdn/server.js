const express = require("express");
const app = express();
app.listen(8080,()=>console.log("server listening on port 8080"));

app.use(express.static("public"));