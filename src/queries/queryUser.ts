import {user} from '../models/modelUser';
import { Document, MongooseError } from 'mongoose';

interface IUser extends Document {
    login: string;
    password: string;
}

const query = async (username: string) => {   
    return await user.findOne<IUser>({login: username}).exec()  
};

export { query as queryUser };