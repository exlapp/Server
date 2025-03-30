import { compare } from "bcrypt";
import { MongooseError } from "mongoose";
import { jwtGenerator } from "../common/jwtGenerator";
import { queryUser } from "../data/queries/queryFindUser";

interface IExistingUser {
    id: string
    login: string
    password: string
}

const service = async (login: string, password: string) => {

    try {

        if (!login) {
            return {statusCode: 400, data: {message: 'Username is underfined'}};                        
        };
                
        const resultQuery = await queryUser(login);
            
        if (!resultQuery) {
            return {statusCode: 404, data: {message: 'User is not found'}};                        
        };
        
        if (!password) {
            return {statusCode: 400, data: {message: 'Password is underfined'}};                        
        };

        // const salt: string = await genSalt(10);
        // const hashPassword: string = await hash(password, salt);        
        const compareResult: boolean = await compare(password, resultQuery.password);
                
        if (!compareResult) {
            return {statusCode: 403, data: {message: 'Wrong password!'}};           
        }

        const {id}: IExistingUser = resultQuery;
        const {tokenAccess, tokenRefresh} = jwtGenerator(id);        
        
       return {statusCode: 200, data: {message: 'Access granted!', tokenAccess: tokenAccess, tokenRefresh: tokenRefresh}};              

    } catch (error) {

        if (error instanceof MongooseError) {
            //response.json({ error: error });
        };

    };

}

export { service as servAuth };