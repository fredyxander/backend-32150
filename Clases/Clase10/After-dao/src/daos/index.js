import {options} from "../config/databaseConfig.js";

let ContenedorDaoProductos;
let ContenedorDaoCarritos;

//identificador
let databaseType = "sql";

switch(databaseType){
    case "archivos":
        const {ProductsDaoArchivos} = await import("./products/productsFiles.js");
        const {CartsDaoArchivos} = await import("./carts/cartsFiles.js");
        ContenedorDaoProductos = new ProductsDaoArchivos(options.fileSystem.pathProducts);
        ContenedorDaoCarritos = new CartsDaoArchivos(options.fileSystem.pathCarts);
        break;
    case "sql":
        const {ProductosDaoSQL} = await import("./products/productsSql.js");
        const {CarritosDaoSQL} = await import("./carts/cartsSql.js");
        ContenedorDaoProductos = new ProductosDaoSQL(options.sqliteDB, "productos");
        ContenedorDaoCarritos = new CarritosDaoSQL(options.sqliteDB,"carritos");
        break;
    case "mongo":
        break;
}

export {ContenedorDaoProductos,ContenedorDaoCarritos}