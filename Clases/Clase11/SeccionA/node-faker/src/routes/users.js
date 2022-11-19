import express, { application } from "express";
import { UserMock } from "../mocks/userMock.js";

const UserRouter = express.Router();

const usersApi = new UserMock();

// /:id //url param
//?cant=20 //query param

UserRouter.post("/generar-usuarios", (req,res)=>{
    const {cant} = req.query;
    let results = usersApi.populate(parseInt(cant));
    res.send(results);
})

UserRouter.get("/",(req,res)=>{
    let users = usersApi.getAll();
    res.send(users)
})

export {UserRouter}