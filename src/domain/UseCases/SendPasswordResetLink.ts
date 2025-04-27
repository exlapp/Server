import { User } from "../Entities/User";
import { AuthRepository } from '../../Adapters/AuthRepository'
import { hash } from 'bcrypt';

interface IUser {    
    id: string | undefined;
    login: string | undefined;
    password: string | undefined;
    status: boolean | undefined;
}

class UseCase {

    execute = async (reqLogin: string): Promise<IUser | null> => {

        const user = new User({ login: reqLogin });
        const { findUser } = new AuthRepository();
        
        const userEntity = user.getEntity();
        if (!userEntity) {
            throw new Error("User must have id and password");                
        }
        
        const { login: entlogin } = userEntity;

        if (!entlogin) {
            throw new Error("User must have login");
        }

        const userFound = await findUser(entlogin);

        if (!userFound) {
            return null
        }

        const { id, password, status } = userFound;

        user.setStatus(status);
        user.setId(id);
        user.setPassword(password);

        return user.getEntity()

    }

}

export { UseCase as SendPasswordResetLink };