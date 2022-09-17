class Perro{
    constructor(name, age, raza){
        this.name = name;
        this.age = age;
        this.raza = raza;
    }
}

const perroTomy = new Perro("tomy", 3, "labrador");
console.log(perroTomy);

const perroScooby = new Perro("scooby", 7, "gran danes");
console.log(perroScooby)
