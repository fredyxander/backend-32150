const path = require("path");

module.exports = {
    //modo
    mode:"production",
    //entry->archivo principal que necesitamos transpilar.
    entry:"./src/server.ts",

    //target->donde ejecutar el codigo una vez se haya hecho el empatemiento
    target:"node",

    //donde voy a almacenar los archivos ya transpilados
    output:{
        //directorio o la carpeta
        path:path.join(__dirname, "dist"),
        //archivo unico, despues del empaquetado
        filename:"main.js"
    },

    resolve:{
        //definir con que archivos vamos a trabajar.
        extensions:[".ts",".js"]
    },

    //loaders.
    module:{
        rules:[
            {
                test:/\.tsx?/, //definimos los archivos para lo que vamos aplicar esta regla.
                use:"ts-loader",
                exclude:/node_modules/
            }
        ]
    }
}