const fs = require("fs");
const path = require("path");

class ContenedorChat{
    constructor(filename){
        this.filename = path.join(__dirname,"..",`/files/${filename}`);
    }

    async save(chatObj){
        try {
            if(fs.existsSync(this.filename)){
                const messages = await this.getAll();
                if(messages.length>0){
                    const newId = messages[messages.length-1].id +1;
                    const newMsg = {
                        id:newId,
                        ...chatObj,
                    };
                    messages.push(newMsg);
                    console.log("messages", messages)
                    await fs.promises.writeFile(this.filename,JSON.stringify(messages,null,2));
                } else {
                    const newMsg = {
                        id:1,
                        ...chatObj,
                    };
                    await fs.promises.writeFile(this.filename,JSON.stringify([newMsg],null,2));
                }
            } else{
                //si el archivo no existe, creamos el array con un primer mensaje
                const newMsg = {
                    id:1,
                    ...chatObj
                }
                await fs.promises.writeFile(this.filename,JSON.stringify([newMsg],null,2));
            }
        } catch (error) {
            return "No se pudo almacenar el mensaje"
        }
    }

    async getAll(){
        try {
            if(fs.existsSync(this.filename)){
                const contenido = await fs.promises.readFile(this.filename, "utf-8");
                if(contenido){
                    const messagesHistory = JSON.parse(contenido);
                    return messagesHistory;
                } else{
                    await fs.promises.writeFile(this.filename, JSON.stringify([]));
                    return [];
                }
            } else{
                await fs.promises.writeFile(this.filename, JSON.stringify([]));
                return [];
            }
        } catch (error) {
            return "El archivo no existe"
        }
    }
}

module.exports = ContenedorChat;