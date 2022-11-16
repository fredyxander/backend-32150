import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ContenedorArchivo {

    constructor(filename) {
        this.filename =path.join(__dirname,"..",`files/${filename}`);
    }

    async getById(id) {
        const objects = await this.getAll()
        const index = objects.findIndex(element=> element.id === id);
        if (index === -1) {
            return {message:`Error al buscar: no se encontró el id ${id}`, error:true};
        } else {
            const objectFound = objects[index];
            return {message: objectFound, error:false};
        }
    }

    async getAll() {
        try {
            const contentFile = await fs.promises.readFile(this.filename, 'utf-8')
            return JSON.parse(contentFile)
        } catch (error) {
            return []
        }
    }

    async save(obj) {
        const objects = await this.getAll()

        let newId
        if (objects.length === 0) {
            newId = 1
        } else {
            newId = objects[objects.length - 1].id + 1
        }

        const newObj = { id: newId, ...obj }
        objects.push(newObj)

        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(objects, null, 2))
            return newObj;
        } catch (error) {
            return {message:`Error al guardar: ${error}`};
        }
    }

    async updateById(info, id) {
        const objects = await this.getAll()
        const index = objects.findIndex(element=> element.id === id)
        if (index == -1) {
            return {message:`Error al actualizar: no se encontró el id ${id}`};
        } else {
            objects[index] = { ...info, id }
            try {
                await fs.promises.writeFile(this.filename, JSON.stringify(objects, null, 2))
                return {message:"Update successfully"}
            } catch (error) {
                return {message:`Error al actualizar: ${error}`}
            }
        }
    }

    async deleteById(id) {
        const objects = await this.getAll();
        const index = objects.findIndex(element=> element.id === id);
        if (index == -1) {
            return {message:`Error al borrar: no se encontró el id ${id}`};
        }

        objects.splice(index, 1)
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(objects, null, 2));
            return {message:"delete successfully"};
        } catch (error) {
            return {message:`Error al borrar: ${error}`};
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify([]));
            return {message:"delete successfully"}
        } catch (error) {
            return {message:`Error al borrar todo: ${error}`};
        }
    }
}

export {ContenedorArchivo};
