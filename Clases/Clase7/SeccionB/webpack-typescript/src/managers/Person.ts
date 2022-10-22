class Person{
    private first_name:string;
    private last_name:string;

    constructor(name:string, lastname:string){
        this.first_name = name;
        this.last_name = lastname;
    }

    getFullName(){
        return `${this.first_name} ${this.last_name}`
    }
}

export default Person;
// const usuario = new Person("fredy","castro");
// console.log(usuario.getFullName());