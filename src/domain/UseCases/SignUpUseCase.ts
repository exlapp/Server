import { User } from "../Entities/User";
import { AuthRepository } from '../../Adapters/AuthRepository'
import { hash } from 'bcrypt';
import { console } from "inspector";
import EventEmitter from "events";

interface IUser {    
    id: string | undefined;
    login: string | undefined;
    password: string | undefined;
    status: boolean | undefined;
}

class UseCase {
    
    execute = async (login: string, password: string): Promise<IUser | null> => {
        
        try {

            const hashedPassword = await hash(password, 10);
            const user = new User({login: login, password: hashedPassword});
            const authRepository = new AuthRepository();

            const userEntity = user.getEntity();
            if (!userEntity) {
                throw new Error("User must have login and password");                
            }
        
            const { login: entLogin, password: entPassword } = userEntity;

            if (!entLogin || !entPassword) {
                throw new Error("User must have login and password");
            }
        
            // const userLogin = user.getEntity().login;        
            // if (!userLogin) {
            //     throw new Error("User must have login");                
            // }        
        
            const queryResult = await authRepository.signUp(entLogin, entPassword);            
            if (!queryResult) {
                return null
            }
           
            const { id, status } = queryResult;
            
            user.setId(id);
            user.setStatus(status);        
                        
            return user.getEntity()
            
        } catch (error) {                           
            throw error;             
        }              
            
    }

}

export { UseCase as SingnUpUseCase }