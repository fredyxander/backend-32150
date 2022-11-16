fetch("//api.com/usuarios").then(
    (resultado)=>{
        document.getElementById("contenedor").innerHTML = resultado
    }
)