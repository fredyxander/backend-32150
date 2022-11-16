import { ContenedorArchivo } from "../../managers/ContenedorArchivo.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class CartsDaoArchivos extends ContenedorArchivo{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {CartsDaoArchivos}