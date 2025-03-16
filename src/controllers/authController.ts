import { Request, Response, NextFunction } from "express";
import { queryUser } from "../queries/queryUser";
import { Result, ValidationError, validationResult } from "express-validator";
import { MongooseError } from "mongoose";
import { view } from '../views/viewAuth';
import { genSalt, hash, compare } from "bcrypt";

interface IAuth {
    username: string
    password: string
}

interface IUser {
    login: string
    password: string
}

const getAuth = async (request: Request, response: Response, next: NextFunction): Promise<void> => {    
        
    try {

        const result: Result<ValidationError> = validationResult(request);        
    
        if (!result.isEmpty()) {
            view({statusCode: 400, data: {message: 'Bad Request'}, response: response});
            return            
        };

        const {username, password}: IAuth = request.body;
        const resultQuery = await queryUser(username);        
    
        if (!resultQuery) {
            view({statusCode: 404, data: {message: 'User is not found'}, response: response});
            return            
        };

        // const salt: string = await genSalt(10);
        // const hashPassword: string = await hash(password, salt);        
        const compareResult: boolean = await compare(password, resultQuery.password);
                
        if (!compareResult) {
            view({statusCode: 403, data: {message: 'Wrong password!'}, response: response});                
            return;
        }

        view({statusCode: 200, data: {message: 'Access granted!'}, response: response});
              

    } catch (error) {

        if (error instanceof MongooseError) {
            response.json({ error: error });
        };

    };
    
};

export { getAuth };