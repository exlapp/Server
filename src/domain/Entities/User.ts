import { Id } from '../ValueObjects/Id';
import { Login } from '../ValueObjects/Login';
import { Password } from '../ValueObjects/Password';
import { Status } from '../ValueObjects/Status';

interface IProps {
    id?: string;
    login?: string;
    password?: string;
    status?: boolean;
}

interface IClass {

    getEntity: () => {
        id: string | undefined;
        login: string | undefined;
        password: string | undefined;
        status: boolean| undefined;
    }

};

class User implements IClass {
    
    private id?: Id
    private login?: Login
    private password?: Password
    private status?: Status
    
    constructor({

        id,
        login,
        password,
        status

    }: IProps) {

        this.id = id ? new Id(id) : undefined,
        this.login = login ? new Login(login) : undefined,
        this.password = password ? new Password(password) : undefined
        this.status = status ? new Status(status) : undefined
        
    }

    public setId = (id: string) => {
        this.id = new Id(id);
    }

    public setLogin = (login: string) => {
        this.login = new Login(login);
    }

    public setPassword = (password: string) => {
        this.password = new Password(password);
    }

    public setStatus = (status: boolean) => {
        this.status = new Status(status);
    }
        
    public getEntity = () => {
        
        const { id, login, password, status } = this;

        return {
            id: id ? id.getValue() : undefined,
            login: login ? login.getValue() : undefined,
            password: password ? password.getValue() : undefined,
            status: status ? status.getValue() : undefined
        };

    }

};

export {User}