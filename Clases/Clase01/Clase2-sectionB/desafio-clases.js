class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    addBook(nombre, autor){
        const newBook = {nombre: nombre, autor: autor};
        console.log(newBook);
        this.libros.push(newBook);
    }
}

const usuario1 = new Usuario("fredy", "chaparro", [{nombre:"It", autor:"stephen king"}], ["tony", "lucas"]);
console.log(usuario1)
usuario1.addBook("El senor de los anillos","J.R tolkien");
