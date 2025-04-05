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
    
    execute = async (userId: string, password: string): Promise<IUser | null> => {
        
        try {

            const hashedPassword = await hash(password, 10);
            const user = new User({ id: userId, password: hashedPassword });
            const { setNewPassword } = new AuthRepository();

            const userEntity = user.getEntity();
            if (!userEntity) {
                throw new Error("User must have id and password");                
            }
        
            const { id: entId, password: entPassword } = userEntity;

            if (!entId || !entPassword) {
                throw new Error("User must have id and password");
            }
        
            // const userLogin = user.getEntity().login;        
            // if (!userLogin) {
            //     throw new Error("User must have login");                
            // }        
        
            const queryResult = await setNewPassword(entId, entPassword);            
            if (!queryResult) {
                throw new Error('Пользователь не найден!');
            }
           
            const { login, status } = queryResult;
            
            user.setLogin(login);
            user.setStatus(status);        
                        
            return user.getEntity()
            
        } catch (error) {                           
            throw error;             
        }              
            
    }

}

export { UseCase as SetNewPasswordUseCase }