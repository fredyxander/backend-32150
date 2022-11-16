import { ContenedorMysql } from "../../managers/ContenedorMysql.js";

class ProductosDaoSQL extends ContenedorMysql{
    constructor(options,tableName){
        super(options,tableName)
    }
}

export {ProductosDaoSQL}