const fs = require("fs");

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }

    save = async(product)=>{
        try {
            //leer el archivo existe
            if(fs.existsSync(this.nameFile)){
                const productos = await this.getAll();
                const lastIdAdded = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                const newProduct={
                    id: lastIdAdded+1,
                    ...product
                }
                productos.push(newProduct);
                await fs.promises.writeFile(this.nameFile, JSON.stringify(productos, null, 2))
            } else{
                // si el archivo no existe
                const newProduct={
                    id:1,
                    ...product
                }
                //creamos el archivo
                await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async(id)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const productos = await this.getAll();
                const producto = productos.find(item=>item.id===id);
                return producto
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async()=>{
        try {
            const contenido = await fs.promises.readFile(this.nameFile,"utf8");
            const productos = JSON.parse(contenido);
            return productos
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try {
            const productos = await this.getAll();
            const newProducts = productos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.nameFile, JSON.stringify(newProducts, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async()=>{
        try {
            await fs.promises.writeFile(this.nameFile, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }
}

const listaProductos = new Contenedor("./productos.txt");
const producto1 = {
    title:"camisa",
    price:300,
    thumbnail:"https://arturocalle.vtexassets.com/arquivos/ids/473103/HOMBRE-CAMISA-10122546-AZUL-780_1.jpg?v=637950736212900000"
}
const productoRepetido = {
    title:"camisa",
    price:300,
    thumbnail:"https://arturocalle.vtexassets.com/arquivos/ids/473103/HOMBRE-CAMISA-10122546-AZUL-780_1.jpg?v=637950736212900000"
}
const producto2 = {
    title:"zapatos",
    price:100,
    thumbnail:"https://arturocalle.vtexassets.com/arquivos/ids/473103/HOMBRE-CAMISA-10122546-AZUL-780_1.jpg?v=637950736212900000"
}

const producto3 = {
    title:"sombrero",
    price:200,
    thumbnail:"https://arturocalle.vtexassets.com/arquivos/ids/473103/HOMBRE-CAMISA-10122546-AZUL-780_1.jpg?v=637950736212900000"
}

const crearProducto = async()=>{
    await listaProductos.save(producto1);
    await listaProductos.save(producto2);
    await listaProductos.save(producto3);
    const resultadoId = await listaProductos.getById(1);
    console.log(resultadoId)
    const productos = await listaProductos.getAll();
    console.log(productos)
    await listaProductos.deleteById(2);
    await listaProductos.save(producto2);
    // await listaProductos.deleteAll();
}

crearProducto();
