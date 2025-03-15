import { Request, Response, NextFunction } from "express";
import { queryUser } from "../queries/queryUser";
import { validationResult } from "express-validator";
import { MongooseError } from "mongoose";

interface IAuth {
    username: string
    password: string
}

interface IUser {
    login?: string
    password?: string
}

const getAuth = async (request: Request, response: Response, next: NextFunction): Promise<void> => {    
        
    const result = validationResult(request);
    
    if (result.isEmpty()) {

        const {username, password}: IAuth = request.body;
        
        await queryUser(username)

            .then((user) => {
                return user
            })
                    
            .catch((err: MongooseError) => {
                console.log(err)
                return err
            });                                    
               
    } else {
        response.send({ errors: result.array() });
    } 
    
};

export { getAuth };