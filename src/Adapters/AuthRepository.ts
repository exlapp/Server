import { queryFindUser } from "../data/queries/queryFindUser";
import { queryUpdateUser } from "../data/queries/queryUpdateUser";
import { queryCreateUser } from '../data/queries/queryCreateUser'
import { AuthPort } from "../domain/Ports/AuthPort";
import { log } from "console";
import { queryNewPasswordSet } from "../data/queries/queryNewPasswordSet";

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

    signUp = async (login: string, password: string): Promise<IProps | null> => {
        
        try {
            
            const newUser = await queryCreateUser( login, password, false );
            if (!newUser) return null;

            return {
                id: newUser.id,
                login: newUser.login,
                password: newUser.password,
                status: newUser.status            
            }
            
        } catch (error) {
            throw error;
        }

    };

    setNewPassword = async (id: string, newPassword: string): Promise<IProps | null> => {

        try {

            const userWithNewPassword = await queryNewPasswordSet(id, newPassword);
            if (!userWithNewPassword) return null;

            return {
                id: userWithNewPassword.id,
                login: userWithNewPassword.login,
                password: userWithNewPassword.password,
                status: userWithNewPassword.status            
            }

        } catch (error) {
            throw error;
        }

    };
}

export { Adapter as AuthRepository }
