const fs = require("fs");
const path = require("path");

class Contenedor{
    constructor(filename){
        this.filename =path.join(__dirname,"..",`files/${filename}`);
    }

    save = async(product)=>{
        try {
            //leer el archivo existe
            if(fs.existsSync(this.filename)){
                const productos = await this.getAll();
                const lastIdAdded = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                const newProduct={
                    id: lastIdAdded+1,
                    ...product
                }
                productos.push(newProduct);
                await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2))
                return productos;
            } else {
                // si el archivo no existe
                const newProduct={
                    id:1,
                    ...product
                }
                //creamos el archivo
                await fs.promises.writeFile(this.filename, JSON.stringify([newProduct], null, 2));
            }
        } catch (error) {
            console.log("error saving",error);
        }
    }

    getById = async(id)=>{
        try {
            if(fs.existsSync(this.filename)){
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
            const contenido = await fs.promises.readFile(this.filename,"utf8");
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
            await fs.promises.writeFile(this.filename, JSON.stringify(newProducts, null, 2));
            return `product with id:${id} deleted`;
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async()=>{
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }

    updateById = async(id, body)=>{
        try {
            const productos = await this.getAll();
            const productPos = productos.findIndex(elm=>elm.id === id);
            productos[productPos] = {
                id:id,
                ...body
            };
            await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2))
            return productos;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor;