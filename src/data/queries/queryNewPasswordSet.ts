import { after } from 'node:test';
import {user} from '../models/modelUser';
import { Document } from 'mongoose';

interface IUser extends Document {    
    login: string;
    password: string;
    status: boolean;    
}

const query = async (id: string, newPassword: string): Promise<IUser | null> => {   
    
    try {

        const updateUser = await user.findOneAndUpdate({ _id: id }, { password: newPassword }, { returnDocument: 'after' });
        if (!updateUser) {
            return null;
        }
        
        return updateUser;

    } catch (error) {
        throw error;         
    };    
    
};

export { query as queryNewPasswordSet };