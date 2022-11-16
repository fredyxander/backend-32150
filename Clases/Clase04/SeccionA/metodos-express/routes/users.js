const express = require("express");
const userRouter = express.Router();

userRouter.get("/",(req,res)=>{
    res.send("soy una ruta de usuarios")
})

module.exports = {
    userRouter
};