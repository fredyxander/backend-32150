import { options } from "./options/sqliteconfig.js";
import knex from "knex";
const database = knex(options);

const articulosArray = [
    {nombre:"libro", codigo:"728xd", precio:103.27,stock:3},
    {nombre:"libreta", codigo:"32000", precio:45.27,stock:12},
    {nombre:"esfero", codigo:"5485", precio:2.5,stock:15},
    {nombre:"escuadra", codigo:"88892", precio:5.17,stock:5},
    {nombre:"borrador", codigo:"8721", precio:1.27,stock:10},
];

const operationsDb = async()=>{
    //validamos si la tablaya existe en la base de datos
    const tableExists = await database.schema.hasTable("articulos");
    if(tableExists){
        await database.schema.dropTable("articulos");
    }
    await database.schema.createTable("articulos",table=>{
        table.increments("id");
        table.string("nombre",15).nullable(false);
        table.string("codigo",15).nullable(false);
        table.float("precio ");
        table.integer("stock");
    });

    //insertar articulos
    await database('articulos').insert(articulosArray);

    //Listar la tabla mostrando los resultados en la consola
    const result = await database("articulos").select("*");
    const products = result.map(elm=>({...elm}));
    console.log(products);

    //Borrar el articulo con id = 3
    await database('articulos').where("id",3).del();

    database.destroy();
}

operationsDb();

//
import knex from "knex";

class ContendorSql{
    constructor(options,tableName){
        this.database = knex(options)
        this.table = tableName
    }
    async getAll(){
        const result = await this.database("articulos").select("*");
        const products = result.map(elm=>({...elm}));
        return products
    }
}