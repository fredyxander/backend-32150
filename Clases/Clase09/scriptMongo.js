let connection = new Mongo();
let database = connect("localhost:27017/dbEjercicio");

database.users.insertMany([
    {nombre:"Fredy", apellido:"Chaparro", edad:26,salario:2200,genero:"M"},
    {nombre:"Andres", apellido:"Lopez", edad:28,salario:600,genero:"M"},
    {nombre:"Laura", apellido:"Diaz", edad:22,salario:2600,genero:"F"},
    {nombre:"Victor", apellido:"Machado", edad:29,salario:1500,genero:"M"},
    {nombre:"Camilo", apellido:"Mora", edad:16,salario:2200,genero:"M"},
    {nombre:"Lizeth", apellido:"Gutierrez", edad:24,salario:1800,genero:"F"},
    {nombre:"Nataly", apellido:"Caicedo", edad:27,salario:2800,genero:"F"}
])