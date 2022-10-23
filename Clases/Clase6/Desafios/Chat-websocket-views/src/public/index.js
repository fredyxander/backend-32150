const socketClient = io();

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


//productos en tiempo real
const createTable = async(data)=>{
    const response = await fetch("./template/table.handlebars");
    const result = await response.text();
    const template = Handlebars.compile(result);
    const html = template({products:data});
    return html;
}

socketClient.on("products",async(data)=>{
    console.log(data)
    const htmlTable = await createTable(data);
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = htmlTable;
})

