console.log("javascript funcionando");

const socketClient = io();

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

const campo = document.getElementById("messageField")

campo.addEventListener("keydown",(evt)=>{
    console.log(evt.key)
    if(evt.key === "Enter"){
        socketClient.emit("message",{
            username:user,
            message:campo.value
        })
    }
})

const messageContainer = document.getElementById("messageContainer");

socketClient.on("historico",(data)=>{
    let elementos="";
    data.forEach(item=>{
        elementos = elementos + `<p><strong>${item.username}</strong>: ${item.message}</p>`;
    });
    messageContainer.innerHTML = elementos;
})

socketClient.on("newUser",()=>{
    Swal.fire({
        text:"nuevo usuario conectado",
        toast:true
    })
})