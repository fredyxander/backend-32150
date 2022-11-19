import {ContenedorMemoria} from "../contenedores/contenedorMemoria.js";
import {faker} from "@faker-js/faker";
const {datatype, name, internet, image} = faker;

class UserMock extends ContenedorMemoria{
    constructor(){
        super()
    }

    populate(cantidad){
        let newUsers = [];
        for(let i=0;i<cantidad;i++){
            newUsers.push(
                {
                    id: datatype.uuid(),
                    nombre:name.firstName(),
                    apellido: name.lastName(),
                    correo: internet.email(),
                    avatar: image.avatar()
                }
            )
        }
        this.users = [...this.users, ...newUsers];
        return newUsers;
    }
}

export {UserMock}