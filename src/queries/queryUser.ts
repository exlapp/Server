import {user} from '../models/modelUser';
import { Document } from 'mongoose';

interface IUser extends Document {
    login: string;
    password: string;
}

const query = async (username: string): Promise<IUser | null> => {   
    return await user.findOne<IUser>({login: username}).exec()  
};

export { query as queryUser };