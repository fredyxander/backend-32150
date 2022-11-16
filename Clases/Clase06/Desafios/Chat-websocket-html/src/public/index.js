console.log("javascript funcionando");

//creamos el socket del cliente.
const socketClient = io();

//captura el valor del usuario
let user;
Swal.fire({
    title:"Hola usuario",
    text:"bienvenido, ingresa tu usario",
    input:"text",
    allowOutsideClick:false
}).then(respuesta=>{
    // console.log(respuesta)
    user = respuesta.value;
});


//guardar un producto desde el cliente
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit",(evt)=>{
    //prevenir comportamientos por defecto no deseados del formulario
    evt.preventDefault();
    const product ={
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    //enviamos el nuevo producto al servidor.
    socketClient.emit("newProduct",product);
})



//productos en tiempo real
//crear un tabla en html basado en los datos, y en el template de handlebars
const createTable = async(data)=>{
    const response = await fetch("./templates/table.handlebars");
    const result = await response.text();
    const template = Handlebars.compile(result);
    const html = template({products:data});
    return html;
}

const productsContainer = document.getElementById("productsContainer");
socketClient.on("products",async(data)=>{
    // console.log(data)
    //generar el html basado en la plantilla de hbs con todos los productos
    const htmlProducts = await createTable(data);
    productsContainer.innerHTML = htmlProducts;
})



//logica del chat
//enviar el mensaje desde el cliente
const campo = document.getElementById("messageField")
campo.addEventListener("keydown",(evt)=>{
    // console.log(evt.key)
    if(evt.key === "Enter"){
        socketClient.emit("message",{
            username:user,
            message:campo.value
        })
        campo.value ="";
    }
})

//mostrar los mensajes cuando el usuario carga la página
const messageContainer = document.getElementById("messageContainer");
socketClient.on("historico",(data)=>{
    let elementos="";
    data.forEach(item=>{
        elementos = elementos + `<p><strong>${item.username}</strong>: ${item.message}</p>`;
    });
    messageContainer.innerHTML = elementos;
})

// socketClient.on("newUser",()=>{
//     Swal.fire({
//         text:"nuevo usuario conectado",
//         toast:true
//     })
// })