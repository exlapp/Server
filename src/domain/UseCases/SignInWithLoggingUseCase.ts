import { User } from "../Entities/User";
import { AuthRepository } from '../../Adapters/AuthRepository'
import { Mongoose, MongooseError } from "mongoose";
import { console } from "inspector";
import EventEmitter from "events";

interface IUser {    
    id: string | undefined;
    login: string | undefined;
    password: string | undefined;
    status: boolean | undefined;
}

class UseCase {
    
    execute = async (login: string): Promise<IUser | null> => {
        
        try {

            const user = new User({login});
            const authRepository = new AuthRepository();
        
            const userLogin = user.getEntity().login;        
            if (!userLogin) {
                throw new Error("User must have login");                
            }        
        
            const queryResult = await authRepository.signIn(userLogin);            
            if (!queryResult) {
                return null
            }
                        
            const {id, password, status} = queryResult;
                 
            user.setId(id);
            user.setPassword(password);
            user.setStatus(status);
                        
            return user.getEntity()
            
        } catch (error) {                           
            throw error;             
        }              
            
    }

}

export { UseCase as SignInWithLoggingUseCase }