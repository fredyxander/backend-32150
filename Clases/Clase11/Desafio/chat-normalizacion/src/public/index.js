const socketClient = io();

//captura el formulario y lo agrega al usuario
let user;
Swal.fire({
    title: 'Formulario perfil',
    html: `<input type="text" id="email" class="swal2-input" placeholder="Correo">
    <input type="text" id="name" class="swal2-input" placeholder="Nombre">
    <input type="text" id="lastname" class="swal2-input" placeholder="Apellido">`,
    confirmButtonText: 'Iniciar',
    focusConfirm: false,
    preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const name = Swal.getPopup().querySelector('#name').value;
        const lastname = Swal.getPopup().querySelector("#lastname").value;
        if (!email || !name || !lastname) {
            Swal.showValidationMessage(`Pro favor complete el formulario`);
        }
        return { email, name, lastname}
    },
    allowOutsideClick: false
}).then((result) => {
    Swal.fire(`
      Email: ${result.value.email}
      Nombre: ${result.value.name}
      Apellido: ${result.value.lastname}
    `.trim());
    console.log(result.value);
    user = result.value;
});

//**************//
//envio del formulario
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();
    const product= {
        title:document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    socketClient.emit("newProduct",product)
    productForm.reset();
})


//**************//
//productos en tiempo real
const createTable = async(data)=>{
    const response = await fetch("./template/table.handlebars");
    const result = await response.text();
    const template = Handlebars.compile(result);
    const html = template({products:data});
    return html;
}

socketClient.on("products",async(data)=>{
    const htmlTable = await createTable(data);
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = htmlTable;
})

//esquemas
const authorSchema = new normalizr.schema.Entity("authors",{}, {idAttribute:"email"});
const messageSchema = new normalizr.schema.Entity("messages", {author: authorSchema});
const chatSchema = new normalizr.schema.Entity("chat", {
    messages:[messageSchema]
}, {idAttribute:"id"});


//**************//
//chat
socketClient.on("messages",async (dataMsg)=>{
    console.log("dataMsg", dataMsg);
    //de-normalizar
    const normalData = normalizr.denormalize(dataMsg.result,chatSchema,dataMsg.entities);
    // console.log("normalData",normalData)
    let messageElements = "";
    normalData.messages.forEach(msg=>{
        messageElements += `<div><strong>${msg.author.name} - ${msg.timestamp}:</strong> ${msg.text}</div>`;
    })
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.innerHTML = normalData.messages.length>0 ? messageElements : '';
});

//envio del mensaje del chat
const chatInput = document.getElementById("chatMsg");
const chatButton = document.getElementById("sendMsg");

chatButton.addEventListener("click",()=>{
    socketClient.emit("newMessage",{
        author:user,
        text:chatInput.value,
        timestamp: new Date().toLocaleString(),
    });
    chatInput.value = "";
})
