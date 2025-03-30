import { queryFindUser } from "../data/queries/queryFindUser";
import { queryUpdateUser } from "../data/queries/queryUpdateUser";
import { AuthPort } from "../domain/Ports/AuthPort";

interface IProps {
    id: string;
    login: string;
    password: string;
    status: boolean;
}

class Adapter extends AuthPort {

    signIn = async (login: string): Promise<IProps | null> => {
        
        try {

            const user = await queryFindUser(login);            
            if (!user) return null;
            
            const {id} = user;
            const updatedUser = await queryUpdateUser(id);
            if (!updatedUser) return null;
                        
            return {
                id: updatedUser.id,
                login: updatedUser.login,
                password: updatedUser.password,
                status: updatedUser.status            
            }

        } catch (error) {
            throw error;
        }
                     
        
    };

    // signUp = async (login: string, password: string): Promise<IProps | null | Error> => {
    //     return {login, password}
    // }

    // signOut = async () => {
    //     return "logout"
    // }
}

export { Adapter as AuthRepository }
