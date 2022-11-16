//importar las options
import { options } from "../config/databaseConfig.js";

//importamos knex y utilizando las options nos conectamos a la base de datos.
import knex from "knex";

//creamos la instancia de la base de datos
const databaseSqliteDb = knex(options.sqliteDB);

//creamos la tabla de productos
const createTables = async()=>{
    try {
        //0. verificamos si la tabla ya existe
        const tableProductsExists = await databaseSqliteDb.schema.hasTable("productos");
        if(tableProductsExists){
            await databaseSqliteDb.schema.dropTable("productos");
        }
        //1.crear la tabla productos
        await databaseSqliteDb.schema.createTable("productos",table=>{
            table.increments("id");
            table.string("title",40).nullable(false);
            table.integer("price").nullable(false);
            table.string("thumbnail",200).nullable(false);
        });
        console.log("productos table created");

        //0. verificamos si la tabla ya existe
        const tableCartExists = await databaseSqliteDb.schema.hasTable("carritos");
        if(tableCartExists){
            await databaseSqliteDb.schema.dropTable("carritos");
        }
        //1.crear la tabla productos
        await databaseSqliteDb.schema.createTable("carritos",table=>{
            table.increments("id");
            table.string("timestamp").nullable(false);
            table.string("products").nullable(false);
        });
        console.log("carritos table created");
    } catch (error) {
        console.log("hubo un error" + error);
    }
    databaseSqliteDb.destroy();
}

createTables();