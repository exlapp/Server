import {user} from '../models/modelUser';
import { Document, ObjectId } from 'mongoose';

interface IUser extends Document {    
    login: string;
    password: string;
    status: boolean;
}

const query = async ( login: string, password: string, status: boolean ): Promise<IUser | null> => {   
    
    try {

        const newUser: IUser = await user.create({ login: login, password: password, status: status });       
        if (!newUser) {
             return null;
        }
        
        return newUser;

    } catch (error) {
        throw error;         
    };    
    
};

export { query as queryCreateUser };