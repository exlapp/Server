import {user} from '../models/modelUser';
import { Document } from 'mongoose';

interface IUser extends Document {   
    login: string;
    password: string;
    status: boolean;
}

const query = async (username: string): Promise<IUser | null> => {   
    
    try {

        const foundUser = await user.findOne<IUser>({login: username}).exec();
        if (!foundUser) {
            return null;
        }
        
        return foundUser;

    } catch (error) {
        throw error;         
    };    
    
};

export { query as queryFindUser };