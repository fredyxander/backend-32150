//creamos la plantilla de handlebars
const template = Handlebars.compile(`
<h1>Datos Personales</h1>
<ul>
    <li>{{nombre}}</li>
    <li>{{apellido}}</li>
    <li>{{edad}}</li>
    <li>{{email}}</li>
    <li>{{telefono}}</li>
</ul>
`);

//genera el codigo html, unificando el template y los datos en forma de objeto.
const html = template({
    nombre:"Lucia",
    apellido:"Piterilli",
    edad:27,
    email:"lucia@gmail.com",
    telefono:"28974287934"
})

//resultado
{/* <h1>Datos Personales</h1>
<ul>
    <li>Lucia</li>
    <li>Piterilli</li>
    <li>{{edad}}</li>
    <li>{{email}}</li>
    <li>{{telefono}}</li>
</ul> */}

document.getElementById("contenedor").innerHTML = html;