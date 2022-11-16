import { ContenedorMysql } from "../../managers/ContenedorMysql.js";

class CarritosDaoSQL extends ContenedorMysql{
    constructor(options,tableName){
        super(options,tableName)
    }
}

export {CarritosDaoSQL}