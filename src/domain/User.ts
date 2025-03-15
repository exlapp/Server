import { Id } from "./Id";

interface IProps {
    id: string,
    login: string,
    password: string 
}

interface IClass {
    getValue: () => { [k: string]: string | Id; }
};

class User implements IClass {
    
    private id: Id
    private login: string
    private password: string
    
    constructor({

        id,
        login,
        password

    }: IProps) {

        this.id = new Id(id),
        this.login = login,
        this.password = password
        
    }
        
    public getValue = () => {

        return {
            id: this.id.getValue(),
            login: this.login,
            password: this.password
        };

    }

};

export {User}