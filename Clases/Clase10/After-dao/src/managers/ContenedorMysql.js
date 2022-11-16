import knex from "knex";

class ContenedorMysql{
    constructor(options,tableName){
        this.database = knex(options);
        this.tableName = tableName;
    }

    async getById(id){
        try {
            const product = await this.database.from(this.tableName).where("id",id);
            if(!product.length){
                return {message:`Error al buscar: no se encontró el id ${id}`, error:true};
            } else{
                if(product[0].products){
                    product[0].products = JSON.parse(product[0].products);
                }
                return {message: product[0], error:false};
            }
        } catch (error) {
            return {message:`Hubo un error ${error}`, error:true};
        }
    }

    async getAll(){
        try {
            let response = await this.database.from(this.tableName).select("*");
            let results = response.map(elm=>{
                if(elm.products){
                    return {...elm, products:JSON.parse(elm.products)}
                } else{
                    return {...elm}
                }
            });
            return results;
        } catch (error) {
            return [];
        }
    }

    async save(product){
        try {
            if(product.products){
                product.products = JSON.stringify(product.products, null, 2);
            }
            const [userId] = await this.database.from(this.tableName).insert(product);
            return `new product saved with id: ${userId}`
        } catch (error) {
            return {message:`Error al guardar: ${error}`};
        }
    }

    async updateById(body, id){
        try {
            if(body.products){
                body.products = JSON.stringify(body.products)
            }
            await this.database.from(this.tableName).where("id",id).update(body);
            return {message:"Update successfully"}
        } catch (error) {
            return {message:`Error al actualizar: no se encontró el id ${id}`};
        }
    }

    async deleteById(id){
        try {
            const result = await this.database.from(this.tableName).where("id",id).del();
            if(result === 0){
                return {message:`Error al borrar: No se encontro el id: ${id}`};
            } else{
                return {message:"delete successfully"};
            }
        } catch (error) {
            return {message:`Error al borrar: no se encontró el id ${id}`};
        }
    }

    async deleteAll(){
        try {
            await this.database.from(this.tableName).del();
            return {message:"delete successfully"}
        } catch (error) {
            return {message:`Error al borrar todo: ${error}`};
        }
    }

}

export {ContenedorMysql}